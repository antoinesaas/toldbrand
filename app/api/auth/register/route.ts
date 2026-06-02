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
  const origin = req.nextUrl.origin

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/account/orders`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (data.user?.email && data.session) {
    try {
      await linkOrdersToUser(data.user.id, data.user.email)
    } catch (err) {
      console.error('linkOrdersToUser:', err)
    }
    return NextResponse.json({ ok: true, needsEmailConfirmation: false })
  }

  return NextResponse.json({
    ok: true,
    needsEmailConfirmation: true,
    message: 'Vérifiez votre e-mail pour activer le compte.',
  })
}
