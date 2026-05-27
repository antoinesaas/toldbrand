import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createGelatoOrder } from '@/lib/gelato'

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
      const gelatoOrder = await createGelatoOrder(fullSession)
      console.log('Gelato order created:', gelatoOrder)
    } catch (err) {
      console.error('Failed to create Gelato order:', err)
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Gelato order failed' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
