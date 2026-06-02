import { NextRequest, NextResponse } from 'next/server'
import { ensureOrderFromStripeSession } from '@/lib/ensure-order'
import { createClient } from '@/lib/supabase/server'

/** Récupère une commande payée Stripe → Supabase + Gelato (si pas déjà fait). */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
  }

  let body: { sessionId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const sessionId = body.sessionId?.trim()
  if (!sessionId?.startsWith('cs_')) {
    return NextResponse.json({ error: 'sessionId invalide' }, { status: 400 })
  }

  try {
    const order = await ensureOrderFromStripeSession(sessionId, { userId: user.id })
    return NextResponse.json({ order })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Sync failed'
    console.error('orders/sync:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
