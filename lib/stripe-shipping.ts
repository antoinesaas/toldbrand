import type Stripe from 'stripe'

/** Stripe API 2025+ : adresse dans collected_information.shipping_details */
type ShippingDetails = Stripe.Checkout.Session.ShippingDetails

export function getCheckoutShipping(session: Stripe.Checkout.Session): ShippingDetails | null {
  const raw = session as Stripe.Checkout.Session & {
    collected_information?: { shipping_details?: ShippingDetails | null } | null
    shipping_details?: ShippingDetails | null
  }

  return raw.collected_information?.shipping_details ?? raw.shipping_details ?? null
}
