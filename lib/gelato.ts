import Stripe from 'stripe'
import type { GelatoOrder } from '@/types'

const GELATO_ORDER_BASE = 'https://order.gelatoapis.com'
const GELATO_CONNECT_BASE = 'https://connect.gelatoapis.com'

export async function createGelatoOrder(stripeSession: Stripe.Checkout.Session): Promise<unknown> {
  const shipping = stripeSession.shipping_details
  const customer = stripeSession.customer_details
  const lineItems = (stripeSession.line_items as Stripe.ApiList<Stripe.LineItem>)?.data ?? []

  if (!shipping?.address) {
    throw new Error('Stripe session missing shipping details')
  }

  const gelatoItems = lineItems.map((item, idx) => {
    const product = item.price?.product as Stripe.Product | undefined
    const gelatoProductUid = product?.metadata?.gelatoProductUid ?? ''

    if (!gelatoProductUid) {
      throw new Error(`Missing gelatoProductUid for line item ${idx}`)
    }

    return {
      itemReferenceId: `item-${stripeSession.id}-${idx}`,
      productUid: gelatoProductUid,
      quantity: item.quantity ?? 1,
      files: [],
    }
  })

  const nameParts = (shipping.name ?? customer?.name ?? '').split(' ')
  const firstName = nameParts[0] ?? 'Customer'
  const lastName = nameParts.slice(1).join(' ') || firstName

  const order: GelatoOrder = {
    orderReferenceId: stripeSession.id,
    customerReferenceId: customer?.email ?? undefined,
    currency: 'EUR',
    items: gelatoItems,
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
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.GELATO_API_KEY!,
    },
    body: JSON.stringify(order),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gelato order failed: ${err}`)
  }

  return res.json()
}

export async function getGelatoCustomerProducts(): Promise<unknown> {
  const res = await fetch(`${GELATO_CONNECT_BASE}/product/v1/customer-products?limit=250&offset=0`, {
    headers: {
      Accept: 'application/json',
      'X-API-KEY': process.env.GELATO_API_KEY!,
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to fetch Gelato customer products: ${res.status} ${res.statusText} ${text}`)
  }

  return res.json()
}
