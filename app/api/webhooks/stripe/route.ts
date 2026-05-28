import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createGelatoOrder } from '@/lib/gelato'
import { saveOrderFromStripeSession } from '@/lib/orders'

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product'],
      })

      const userId = fullSession.metadata?.supabase_user_id || null

      await saveOrderFromStripeSession(fullSession, { userId })

      const gelatoResult = (await createGelatoOrder(fullSession)) as { id?: string }
      const gelatoOrderId = gelatoResult?.id

      if (gelatoOrderId) {
        await saveOrderFromStripeSession(fullSession, { userId, gelatoOrderId })
      }

      console.log('Order saved:', session.id, 'Gelato:', gelatoOrderId)
    } catch (err) {
      console.error('Failed to process order:', err)
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Order processing failed' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
