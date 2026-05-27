import Stripe from 'stripe'
import { resolveOrderItem } from '@/lib/resolve-order-item'
import type { CartItem } from '@/types'

const GELATO_ORDER_BASE = 'https://order.gelatoapis.com'
const GELATO_CONNECT_BASE = 'https://connect.gelatoapis.com'
const gelatoApiKey = process.env.GELATO_API_KEY?.trim()

export async function getGelatoCustomerProducts() {
  if (!gelatoApiKey) {
    throw new Error('GELATO_API_KEY is not configured')
  }
  const res = await fetch(`${GELATO_CONNECT_BASE}/product/v1/customer-products`, {
    headers: { 'X-API-KEY': gelatoApiKey },
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gelato products failed (${res.status}): ${err}`)
  }
  return res.json()
}

export async function createGelatoOrder(stripeSession: Stripe.Checkout.Session): Promise<unknown> {
  if (!gelatoApiKey) {
    throw new Error('GELATO_API_KEY is not configured')
  }

  const shipping = stripeSession.shipping_details
  const customer = stripeSession.customer_details
  const lineItems = (stripeSession.line_items as Stripe.ApiList<Stripe.LineItem>)?.data ?? []

  if (!shipping?.address) {
    throw new Error('Stripe session missing shipping details')
  }

  const gelatoItems = lineItems.map((item, idx) => {
    const product = item.price?.product as Stripe.Product | undefined
    const meta = product?.metadata ?? {}

    const cartLike: CartItem = {
      id: `stripe-${idx}`,
      productId: meta.productId ?? '',
      name: item.description ?? product?.name ?? 'TOLD Tee',
      size: (meta.size as CartItem['size']) ?? 'M',
      color: (meta.color as CartItem['color']) ?? 'white',
      colorLabel: meta.colorLabel ?? meta.color ?? '',
      price: item.price?.unit_amount ?? 0,
      quantity: item.quantity ?? 1,
      imageUrl: meta.imageUrl ?? '',
      gelatoProductUid: meta.gelatoProductUid ?? '',
    }

    const resolved = resolveOrderItem(cartLike)
    const url = (process.env.NEXT_PUBLIC_URL ?? 'https://toldbrand.fr').replace(/\s/g, '')
    const printFront = meta.printFront?.startsWith('http')
      ? meta.printFront
      : meta.printFront
        ? `${url}${meta.printFront}`
        : resolved.printFiles[0]?.url
    const printBack = meta.printBack?.startsWith('http')
      ? meta.printBack
      : meta.printBack
        ? `${url}${meta.printBack}`
        : resolved.printFiles[1]?.url

    if (!resolved.productUid) {
      throw new Error(`Missing Gelato product UID for item ${idx}`)
    }

    if (!printFront || !printBack) {
      throw new Error(`Missing print files for item ${idx}`)
    }

    return {
      itemReferenceId: `item-${stripeSession.id}-${idx}`,
      productUid: meta.gelatoProductUid || resolved.productUid,
      quantity: item.quantity ?? 1,
      files: [
        { type: 'default' as const, url: printFront },
        { type: 'back' as const, url: printBack },
      ],
    }
  })

  const nameParts = (shipping.name ?? customer?.name ?? '').split(' ')
  const firstName = nameParts[0] ?? 'Customer'
  const lastName = nameParts.slice(1).join(' ') || firstName

  const order = {
    orderType: 'order',
    orderReferenceId: stripeSession.id,
    customerReferenceId: customer?.email ?? stripeSession.id,
    currency: (stripeSession.currency ?? 'eur').toUpperCase(),
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
      'X-API-KEY': gelatoApiKey,
    },
    body: JSON.stringify(order),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gelato order failed (${res.status}): ${err}`)
  }

  return res.json()
}
