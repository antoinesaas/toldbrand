import { createGelatoOrder } from '@/lib/gelato'
import { saveOrderFromStripeSession } from '@/lib/orders'
import { sendOrderConfirmationEmail } from '@/lib/send-order-email'
import { retrievePaidCheckoutSession } from '@/lib/stripe-session'
import { createAdminClient } from '@/lib/supabase/admin'

export type EnsureOrderResult = {
  order: Awaited<ReturnType<typeof fetchOrderById>>
  gelatoOrderId: string | null
  gelatoError: string | null
}

async function fetchOrderById(orderId: string) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .single()
  if (error) throw error
  return data
}

async function submitToGelato(
  session: Awaited<ReturnType<typeof retrievePaidCheckoutSession>>['session']
): Promise<{ gelatoOrderId: string | null; gelatoError: string | null }> {
  try {
    const gelatoResult = (await createGelatoOrder(session)) as { id?: string }
    if (gelatoResult?.id) {
      return { gelatoOrderId: gelatoResult.id, gelatoError: null }
    }
    return { gelatoOrderId: null, gelatoError: 'Gelato a répondu sans identifiant de commande' }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Gelato create order failed:', message)
    return { gelatoOrderId: null, gelatoError: message }
  }
}

/** Crée ou récupère la commande Supabase + envoi Gelato. */
export async function ensureOrderFromStripeSession(
  sessionId: string,
  opts?: { userId?: string | null; forceGelato?: boolean }
): Promise<EnsureOrderResult> {
  const { session } = await retrievePaidCheckoutSession(sessionId)

  if (session.payment_status !== 'paid') {
    throw new Error('Payment not completed')
  }

  const userId = opts?.userId ?? session.metadata?.supabase_user_id ?? null
  const admin = createAdminClient()

  let orderId: string

  const { data: existing } = await admin
    .from('orders')
    .select('id, gelato_order_id')
    .eq('stripe_session_id', session.id)
    .maybeSingle()

  if (existing?.id) {
    orderId = existing.id
  } else {
    orderId = await saveOrderFromStripeSession(session, { userId })
  }

  let gelatoOrderId = existing?.gelato_order_id ?? null
  let gelatoError: string | null = null

  if (!gelatoOrderId || opts?.forceGelato) {
    const gelato = await submitToGelato(session)
    gelatoOrderId = gelato.gelatoOrderId
    gelatoError = gelato.gelatoError

    if (gelatoOrderId) {
      await saveOrderFromStripeSession(session, { userId, gelatoOrderId })
      await admin
        .from('orders')
        .update({ gelato_status: 'created', status: 'processing' })
        .eq('id', orderId)
    } else if (gelatoError) {
      await admin
        .from('orders')
        .update({
          gelato_status: `failed: ${gelatoError.slice(0, 500)}`,
          status: 'paid',
        })
        .eq('id', orderId)
    }
  }

  const order = await fetchOrderById(orderId)

  if (!gelatoError) {
    try {
      await sendOrderConfirmationEmail(order)
    } catch (err) {
      console.error('Order confirmation email failed:', err)
    }
  }

  return { order, gelatoOrderId, gelatoError }
}
