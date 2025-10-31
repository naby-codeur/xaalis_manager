import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  const { token } = params
  if (!token) return NextResponse.json({ message: 'Token manquant' }, { status: 400 })

  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('token', token)
    .single()

  if (error || !data) return NextResponse.json({ message: 'Invitation introuvable' }, { status: 404 })

  const now = new Date()
  const expired = new Date(data.expires_at) < now
  const invalid = data.status !== 'PENDING' || expired

  return NextResponse.json({
    valid: !invalid,
    reason: invalid ? (expired ? 'EXPIRED' : data.status) : null,
    invitation: !invalid ? data : null,
  })
}

export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const { token } = params
    const body = await req.json()
    const { email, password, firstName, lastName } = body || {}

    if (!token || !email || !password || !firstName || !lastName) {
      return NextResponse.json({ message: 'Paramètres manquants' }, { status: 400 })
    }

    const { data: invite, error: inviteError } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', token)
      .single()

    if (inviteError || !invite) return NextResponse.json({ message: 'Invitation introuvable' }, { status: 404 })

    const now = new Date()
    const expired = new Date(invite.expires_at) < now
    if (invite.status !== 'PENDING' || expired) {
      return NextResponse.json({ message: 'Invitation invalide ou expirée' }, { status: 400 })
    }

    // 1. Créer le compte auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
    if (authError || !authData.user) {
      return NextResponse.json({ message: authError?.message || 'Erreur de création du compte' }, { status: 500 })
    }

    // 2. Insérer l'utilisateur applicatif
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role: invite.role,
        organization_id: invite.organization_id,
        is_active: true,
      })

    if (userError) {
      return NextResponse.json({ message: 'Erreur lors de la création du profil utilisateur' }, { status: 500 })
    }

    // 3. Marquer l'invitation comme acceptée
    const { error: updateError } = await supabase
      .from('invitations')
      .update({ status: 'ACCEPTED', accepted_at: new Date().toISOString() })
      .eq('id', invite.id)

    if (updateError) {
      return NextResponse.json({ message: 'Erreur de mise à jour de l\'invitation' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ message: 'Erreur lors de l\'acceptation de l\'invitation' }, { status: 500 })
  }
}


