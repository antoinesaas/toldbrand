import { NextRequest, NextResponse } from 'next/server'
import { linkOrdersToUser } from '@/lib/orders'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const email = body.email?.trim()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json({ error: 'E-mail et mot de passe requis.' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  if (data.user?.email) {
    try {
      await linkOrdersToUser(data.user.id, data.user.email)
    } catch (err) {
      console.error('linkOrdersToUser:', err)
    }
  }

  return NextResponse.json({ ok: true, userId: data.user?.id })
}
