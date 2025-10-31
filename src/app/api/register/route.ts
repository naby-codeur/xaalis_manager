import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Public endpoint: crée une organisation et un utilisateur ADMIN
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { organizationName, email, password, firstName, lastName } = body || {}

    if (!organizationName || !email || !password || !firstName || !lastName) {
      return NextResponse.json({ message: 'Paramètres manquants' }, { status: 400 })
    }

    // 1) Créer l'utilisateur auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
    if (authError || !authData.user) {
      return NextResponse.json({ message: authError?.message || 'Erreur de création du compte' }, { status: 500 })
    }

    // 2) Créer l'organisation
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: organizationName })
      .select('id')
      .single()

    if (orgError || !orgData) {
      return NextResponse.json({ message: 'Erreur lors de la création de l\'organisation' }, { status: 500 })
    }

    // 3) Créer le profil utilisateur en ADMIN lié à l'organisation
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role: 'ADMIN',
        organization_id: orgData.id,
        is_active: true,
      })

    if (userError) {
      return NextResponse.json({ message: 'Erreur lors de la création du profil utilisateur' }, { status: 500 })
    }

    return NextResponse.json({ success: true, organizationId: orgData.id, userId: authData.user.id })
  } catch (e: any) {
    return NextResponse.json({ message: 'Erreur lors de l\'inscription administrateur' }, { status: 500 })
  }
}


