import type Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCheckoutLineItems } from '@/lib/stripe-session'
import { getCheckoutShipping } from '@/lib/stripe-shipping'

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'in_production'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'failed'

export function mapGelatoStatus(gelatoStatus: string): OrderStatus {
  const s = gelatoStatus.toLowerCase().replace(/-/g, '_')

  if (['delivered', 'delivery_delivered'].includes(s)) return 'delivered'
  if (['shipped', 'in_transit', 'dispatched', 'out_for_delivery'].includes(s)) return 'shipped'
  if (['in_production', 'production', 'passed', 'printing'].includes(s)) return 'in_production'
  if (['processing', 'created', 'pending', 'uploaded', 'passed_to_production'].includes(s))
    return 'processing'
  if (['cancelled', 'canceled', 'rejected'].includes(s)) return 'cancelled'
  if (['failed', 'error'].includes(s)) return 'failed'

  return 'processing'
}

export async function saveOrderFromStripeSession(
  session: Stripe.Checkout.Session,
  opts?: { userId?: string | null; gelatoOrderId?: string }
) {
  const admin = createAdminClient()
  const lineItems = await getCheckoutLineItems(session)
  const shipping = getCheckoutShipping(session)
  const customer = session.customer_details
  const email = customer?.email

  if (!email) {
    throw new Error('Stripe session missing customer email')
  }

  const totalCents = session.amount_total ?? 0
  const currency = (session.currency ?? 'eur').toUpperCase()
  const userId = opts?.userId || session.metadata?.supabase_user_id || null

  const { data: existing } = await admin
    .from('orders')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle()

  let orderId = existing?.id

  if (!orderId) {
    const { data: order, error } = await admin
      .from('orders')
      .insert({
        stripe_session_id: session.id,
        user_id: userId || null,
        customer_email: email,
        status: 'paid',
        gelato_order_id: opts?.gelatoOrderId ?? null,
        gelato_status: opts?.gelatoOrderId ? 'created' : null,
        currency,
        total_cents: totalCents,
        shipping_name: shipping?.name ?? customer?.name ?? null,
        shipping_address: shipping?.address
          ? {
              line1: shipping.address.line1,
              line2: shipping.address.line2,
              city: shipping.address.city,
              postal_code: shipping.address.postal_code,
              country: shipping.address.country,
            }
          : null,
      })
      .select('id')
      .single()

    if (error) throw error
    orderId = order.id

    const items = lineItems.map((item) => {
      const product = item.price?.product as Stripe.Product | undefined
      const meta = product?.metadata ?? {}
      return {
        order_id: orderId!,
        product_id: meta.productId ?? 'unknown',
        product_name: item.description ?? product?.name ?? 'TOLD Tee',
        variant_label: meta.colorLabel ?? meta.color ?? '',
        size: meta.size ?? 'M',
        color: meta.color ?? 'white',
        quantity: item.quantity ?? 1,
        unit_price_cents: item.price?.unit_amount ?? 0,
        image_url: meta.imageUrl ?? '',
      }
    })

    if (items.length) {
      const { error: itemsError } = await admin.from('order_items').insert(items)
      if (itemsError) throw itemsError
    }
  } else if (opts?.gelatoOrderId) {
    await admin
      .from('orders')
      .update({
        gelato_order_id: opts.gelatoOrderId,
        gelato_status: 'created',
        status: 'processing',
      })
      .eq('id', orderId)
  }

  if (userId) {
    await admin
      .from('orders')
      .update({ user_id: userId })
      .eq('stripe_session_id', session.id)
  }

  return orderId
}

export function isGelatoDashboardTestPayload(payload: Record<string, unknown>): boolean {
  const ref = String(payload.orderReferenceId ?? '')
  const itemRef = String(
    (payload.items as Array<{ itemReferenceId?: string }> | undefined)?.[0]?.itemReferenceId ?? ''
  )
  return (
    ref.includes('{{') ||
    ref.includes('MyOrderId') ||
    itemRef.includes('{{') ||
    itemRef.includes('MyItemId')
  )
}

export type GelatoWebhookResult = { matched: boolean; orderId?: string }

export async function updateOrderFromGelatoWebhook(
  payload: Record<string, unknown>
): Promise<GelatoWebhookResult> {
  if (isGelatoDashboardTestPayload(payload)) {
    return { matched: false }
  }

  const admin = createAdminClient()

  const orderPayload = (payload.order ?? null) as Record<string, unknown> | null
  const items = (payload.items ?? orderPayload?.items) as
    | Array<{ fulfillments?: Array<{ trackingUrl?: string; trackingCode?: string }> }>
    | undefined
  const firstFulfillment = items?.[0]?.fulfillments?.[0]

  const eventId = String(payload.id ?? '')
  const gelatoOrderId = String(payload.orderId ?? orderPayload?.id ?? '').trim()
  const orderReferenceId = String(
    payload.orderReferenceId ?? orderPayload?.orderReferenceId ?? ''
  ).trim()
  const gelatoStatus = String(
    payload.fulfillmentStatus ??
      payload.status ??
      orderPayload?.status ??
      orderPayload?.fulfillmentStatus ??
      'processing'
  )

  const tracking =
    (orderPayload?.tracking as Record<string, unknown> | undefined) ??
    (Array.isArray(orderPayload?.packages)
      ? (orderPayload.packages[0] as Record<string, unknown>)
      : null)

  const trackingUrl = String(
    firstFulfillment?.trackingUrl ??
      tracking?.url ??
      tracking?.trackingUrl ??
      payload.trackingUrl ??
      ''
  )
  const trackingNumber = String(
    firstFulfillment?.trackingCode ??
      tracking?.number ??
      tracking?.trackingNumber ??
      payload.trackingCode ??
      ''
  )

  const status = mapGelatoStatus(gelatoStatus)

  const patch = {
    gelato_status: gelatoStatus,
    status,
    ...(trackingUrl ? { tracking_url: trackingUrl } : {}),
    ...(trackingNumber ? { tracking_number: trackingNumber } : {}),
  }

  async function updateBy(column: 'gelato_order_id' | 'stripe_session_id', value: string) {
    if (!value || value === eventId) return null

    const { data, error } = await admin
      .from('orders')
      .update(patch)
      .eq(column, value)
      .select('id')
      .maybeSingle()

    if (error) {
      throw new Error(error.message ?? 'Supabase update failed')
    }
    return data
  }

  const byGelatoId =
    gelatoOrderId && !gelatoOrderId.startsWith('os_')
      ? await updateBy('gelato_order_id', gelatoOrderId)
      : null
  if (byGelatoId?.id) return { matched: true, orderId: byGelatoId.id }

  if (orderReferenceId && !orderReferenceId.includes('{{')) {
    const byStripe = await updateBy('stripe_session_id', orderReferenceId)
    if (byStripe?.id) return { matched: true, orderId: byStripe.id }
  }

  return { matched: false }
}

export async function linkOrdersToUser(userId: string, email: string) {
  const admin = createAdminClient()
  await admin
    .from('orders')
    .update({ user_id: userId })
    .eq('customer_email', email)
    .is('user_id', null)
}
