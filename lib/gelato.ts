import Stripe from 'stripe'
import { getCheckoutLineItems } from '@/lib/stripe-session'
import { getCheckoutShipping } from '@/lib/stripe-shipping'
import { getGelatoVariantId, GELATO_STORE_ID } from '@/lib/gelato-store-products'
import type { ProductSize } from '@/types'

const GELATO_ORDER_BASE = 'https://order.gelatoapis.com'
const GELATO_ECOMMERCE_BASE = 'https://ecommerce.gelatoapis.com'
const gelatoApiKey = process.env.GELATO_API_KEY?.trim()

export async function getGelatoCustomerProducts() {
  if (!gelatoApiKey) throw new Error('GELATO_API_KEY is not configured')
  const res = await fetch(
    `${GELATO_ECOMMERCE_BASE}/v1/stores/${GELATO_STORE_ID}/products?limit=20`,
    { headers: { 'X-API-KEY': gelatoApiKey }, next: { revalidate: 3600 } }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gelato products failed (${res.status}): ${err}`)
  }
  return res.json()
}

/**
 * Creates a Gelato order from a paid Stripe session.
 * Uses productVariantId (from the connected Gelato store) keyed by productId + color + size.
 */
export async function createGelatoOrder(
  stripeSession: Stripe.Checkout.Session
): Promise<unknown> {
  if (!gelatoApiKey) throw new Error('GELATO_API_KEY is not configured')

  const shipping = getCheckoutShipping(stripeSession)
  const customer = stripeSession.customer_details
  const lineItems = await getCheckoutLineItems(stripeSession)

  if (!shipping?.address) {
    throw new Error('Stripe session missing shipping address')
  }
  if (!lineItems.length) {
    throw new Error('Stripe session has no line items')
  }

  const items = lineItems.map((item, idx) => {
    const product = item.price?.product as Stripe.Product | undefined
    const meta = product?.metadata ?? {}

    const productId = meta.productId as string | undefined
    const size = (meta.size as ProductSize | undefined) ?? 'M'
    const color = (meta.color as string | undefined) ?? 'black'

    if (!productId) {
      throw new Error(`Missing productId in Stripe metadata for item ${idx}`)
    }

    const productVariantId = getGelatoVariantId(productId, color, size)

    return {
      itemReferenceId: `item-${stripeSession.id}-${idx}`,
      productVariantId,
      quantity: item.quantity ?? 1,
    }
  })

  const nameParts = (shipping.name ?? customer?.name ?? '').split(' ')
  const firstName = nameParts[0] ?? 'Customer'
  const lastName = nameParts.slice(1).join(' ') || firstName

  const order = {
    orderType: 'order',
    storeId: GELATO_STORE_ID,
    orderReferenceId: stripeSession.id,
    customerReferenceId: customer?.email ?? stripeSession.id,
    currency: (stripeSession.currency ?? 'eur').toUpperCase(),
    items,
    shippingAddress: {
      firstName,
      lastName,
      addressLine1: shipping.address.line1 ?? '',
      addressLine2: shipping.address.line2 ?? '',
      city: shipping.address.city ?? '',
      postCode: shipping.address.postal_code ?? '',
      country: shipping.address.country ?? '',
      email: customer?.email ?? '',
    },
  }

  const res = await fetch(`${GELATO_ORDER_BASE}/v4/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': gelatoApiKey },
    body: JSON.stringify(order),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gelato order failed (${res.status}): ${err}`)
  }

  return res.json()
}
