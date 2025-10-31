import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, role, organizationId, invitedByUserId, expiresInDays = 7 } = body || {}

    if (!email || !role || !organizationId || !invitedByUserId) {
      return NextResponse.json({ message: 'Paramètres manquants' }, { status: 400 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + Number(expiresInDays || 7))

    const { data, error } = await supabase
      .from('invitations')
      .insert({
        email,
        role,
        organization_id: organizationId,
        token,
        expires_at: expiresAt.toISOString(),
        invited_by_user_id: invitedByUserId,
        status: 'PENDING',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    const invitationLink = `${req.nextUrl.origin}/register?token=${token}`

    return NextResponse.json({ invitation: data, link: invitationLink })
  } catch (e: any) {
    return NextResponse.json({ message: 'Erreur lors de la création de l\'invitation' }, { status: 500 })
  }
}


