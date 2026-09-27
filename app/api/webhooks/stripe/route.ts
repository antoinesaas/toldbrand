import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ensureOrderFromStripeSession } from '@/lib/ensure-order'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type })
  }

  const session = event.data.object as Stripe.Checkout.Session

  try {
    const result = await ensureOrderFromStripeSession(session.id, {
      userId: session.metadata?.supabase_user_id ?? null,
    })

    console.log(
      'Order processed:',
      session.id,
      '| Gelato:',
      result.gelatoOrderId ?? `ERREUR ${result.gelatoError}`,
      '| DB:',
      result.dbError ? `ERREUR ${result.dbError}` : 'ok'
    )

    // Seul un échec Gelato justifie un 500 : Stripe renverra l'événement plus tard.
    // Une panne de la base seule ne doit pas bloquer — le colis part quand même.
    if (!result.gelatoOrderId) {
      return NextResponse.json(
        { error: result.gelatoError ?? 'Gelato order not created' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      received: true,
      gelatoOrderId: result.gelatoOrderId,
      createdNow: result.createdNow,
      dbError: result.dbError,
    })
  } catch (err) {
    console.error('Failed to process order:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Order processing failed' },
      { status: 500 }
    )
  }
}
