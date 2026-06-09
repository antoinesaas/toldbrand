import { NextRequest, NextResponse } from 'next/server'
import { linkOrdersToUser } from '@/lib/orders'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

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

  // Step 1 — create the user
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

  const userId = data.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Erreur lors de la creation du compte.' }, { status: 500 })
  }

  // Step 2 — auto-confirm the email via admin client (bypasses Supabase email delivery)
  try {
    const admin = createAdminClient()
    await admin.auth.admin.updateUserById(userId, { email_confirm: true })
  } catch (err) {
    console.error('Auto-confirm failed:', err)
    // Non-fatal: user may still need to confirm manually
  }

  // Step 3 — sign in immediately so the session cookie is set
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError || !signInData.session) {
    // Account created but auto-login failed — user can log in manually
    return NextResponse.json({
      ok: true,
      needsEmailConfirmation: false,
      message: 'Compte cree. Connectez-vous avec vos identifiants.',
    })
  }

  // Link any guest orders placed before registration
  try {
    await linkOrdersToUser(userId, email)
  } catch (err) {
    console.error('linkOrdersToUser:', err)
  }

  return NextResponse.json({ ok: true, needsEmailConfirmation: false })
}
