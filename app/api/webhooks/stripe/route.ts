import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createGelatoOrder } from '@/lib/gelato'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product'],
      })
      await createGelatoOrder(fullSession)
    } catch (err) {
      console.error('Failed to create Gelato order:', err)
      // Return 200 so Stripe doesn't retry — log the failure externally
    }
  }

  return NextResponse.json({ received: true })
}
