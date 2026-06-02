import { NextRequest, NextResponse } from 'next/server'
import { ensureOrderFromStripeSession } from '@/lib/ensure-order'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/** Renvoie une commande payée vers Gelato (session Stripe ou id commande). */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'Connexion requise' }, { status: 401 })
  }

  let body: { sessionId?: string; orderId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const admin = createAdminClient()
  let stripeSessionId = body.sessionId?.trim()

  if (!stripeSessionId && body.orderId) {
    const { data: row } = await admin
      .from('orders')
      .select('stripe_session_id, customer_email')
      .eq('id', body.orderId)
      .maybeSingle()

    if (!row || row.customer_email?.toLowerCase() !== user.email.toLowerCase()) {
      return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
    }
    stripeSessionId = row.stripe_session_id
  }

  if (!stripeSessionId?.startsWith('cs_')) {
    return NextResponse.json({ error: 'sessionId manquant' }, { status: 400 })
  }

  try {
    const { order, gelatoOrderId, gelatoError } = await ensureOrderFromStripeSession(
      stripeSessionId,
      { userId: user.id, forceGelato: true }
    )

    return NextResponse.json({ order, gelatoOrderId, gelatoError })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Échec envoi Gelato'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
