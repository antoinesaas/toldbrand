import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

/** Loads checkout line items with product metadata (required for Gelato + order save). */
export async function getCheckoutLineItems(
  session: Stripe.Checkout.Session
): Promise<Stripe.LineItem[]> {
  const expanded = (session.line_items as Stripe.ApiList<Stripe.LineItem> | null)?.data
  if (expanded?.length) return expanded

  const listed = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ['data.price.product'],
  })
  return listed.data
}

export async function retrievePaidCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: [
      'line_items',
      'line_items.data.price.product',
      'collected_information',
      'collected_information.shipping_details',
    ],
  })
  const lineItems = await getCheckoutLineItems(session)
  return { session, lineItems }
}
