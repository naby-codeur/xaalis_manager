import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, token } = body || {}

    if (!id && !token) {
      return NextResponse.json({ message: 'Spécifiez id ou token' }, { status: 400 })
    }

    const query = supabase.from('invitations').update({ status: 'REVOKED' })
    const { error } = id
      ? await query.eq('id', id)
      : await query.eq('token', token as string)

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ message: 'Erreur lors de la révocation' }, { status: 500 })
  }
}


