import { createGelatoOrder, findGelatoOrderByReference } from '@/lib/gelato'
import { normalizeUserId, saveOrderFromStripeSession } from '@/lib/orders'
import { sendOrderConfirmationEmail } from '@/lib/send-order-email'
import { retrievePaidCheckoutSession } from '@/lib/stripe-session'
import { createAdminClient } from '@/lib/supabase/admin'

type OrderRow = Awaited<ReturnType<typeof fetchOrderBySessionId>>

export type EnsureOrderResult = {
  /** Ligne Supabase (null si la base est indisponible — la commande Gelato part quand même). */
  order: OrderRow | null
  gelatoOrderId: string | null
  gelatoError: string | null
  /** Erreur base de données, non bloquante pour l'envoi à l'atelier. */
  dbError: string | null
  /** true si la commande Gelato a été créée pendant cet appel. */
  createdNow: boolean
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (err && typeof err === 'object' && 'message' in err) return String(err.message)
  return String(err)
}

async function fetchOrderBySessionId(sessionId: string) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('orders')
    .select('*, order_items(*)')
    .eq('stripe_session_id', sessionId)
    .maybeSingle()
  if (error) throw error
  return data
}

/**
 * Traite une commande Stripe payée.
 *
 * Ordre volontaire : **Gelato d'abord**, Supabase ensuite. Si la base est en pause
 * ou en panne, le client reçoit quand même son t-shirt ; la base est rattrapée
 * au prochain appel (webhook renvoyé, page succès, sync compte).
 *
 * - `createGelato: false` → lecture seule côté Gelato (page de succès) pour éviter
 *   les doublons quand le webhook et la page arrivent en même temps.
 * - `forceGelato: true` → renvoie à Gelato même si la base indique déjà un id
 *   (bouton « Réessayer »), sauf si Gelato a déjà une commande active.
 */
export async function ensureOrderFromStripeSession(
  sessionId: string,
  opts?: { userId?: string | null; forceGelato?: boolean; createGelato?: boolean }
): Promise<EnsureOrderResult> {
  const { session } = await retrievePaidCheckoutSession(sessionId)

  if (session.payment_status !== 'paid') {
    throw new Error('Payment not completed')
  }

  const userId =
    normalizeUserId(opts?.userId) ?? normalizeUserId(session.metadata?.supabase_user_id)
  const createGelato = opts?.createGelato ?? true

  let dbError: string | null = null
  let gelatoError: string | null = null
  let gelatoOrderId: string | null = null
  let createdNow = false

  // 1. Ce que la base connaît déjà (best effort).
  let existing: OrderRow | null = null
  try {
    existing = await fetchOrderBySessionId(session.id)
  } catch (err) {
    dbError = errorMessage(err)
    console.error('Supabase read failed (non bloquant):', dbError)
  }

  if (existing?.gelato_order_id && !opts?.forceGelato) {
    gelatoOrderId = existing.gelato_order_id
  }

  // 2. Gelato — source de vérité pour « est-ce que le colis part ? ».
  if (!gelatoOrderId) {
    try {
      const found = await findGelatoOrderByReference(session.id)
      if (found) gelatoOrderId = found.id
    } catch (err) {
      // La recherche est un garde-fou anti-doublon ; on ne bloque pas l'envoi dessus.
      console.error('Gelato search failed:', errorMessage(err))
    }
  }

  if (!gelatoOrderId && createGelato) {
    try {
      const result = (await createGelatoOrder(session)) as { id?: string }
      if (result?.id) {
        gelatoOrderId = result.id
        createdNow = true
      } else {
        gelatoError = 'Gelato a répondu sans identifiant de commande'
      }
    } catch (err) {
      gelatoError = errorMessage(err)
      console.error('Gelato create order failed:', gelatoError)
    }
  }

  // 3. Enregistrement / mise à jour en base (best effort).
  let order: OrderRow | null = existing
  try {
    // On ne réécrit l'id Gelato que s'il est nouveau pour la base (sinon on
    // écraserait un statut « shipped » par « processing » à chaque rechargement).
    const gelatoIdIsNew = gelatoOrderId && gelatoOrderId !== existing?.gelato_order_id
    await saveOrderFromStripeSession(session, {
      userId,
      gelatoOrderId: gelatoIdIsNew ? gelatoOrderId! : undefined,
    })

    if (gelatoError && !gelatoOrderId) {
      const admin = createAdminClient()
      await admin
        .from('orders')
        .update({ gelato_status: `failed: ${gelatoError.slice(0, 500)}`, status: 'paid' })
        .eq('stripe_session_id', session.id)
    }

    order = await fetchOrderBySessionId(session.id)
    dbError = null
  } catch (err) {
    dbError = errorMessage(err)
    console.error('Supabase write failed (non bloquant):', dbError)
  }

  // 4. E-mail uniquement à la création (pas à chaque rechargement / renvoi de webhook).
  if (createdNow && order) {
    try {
      await sendOrderConfirmationEmail(order)
    } catch (err) {
      console.error('Order confirmation email failed:', err)
    }
  }

  return { order, gelatoOrderId, gelatoError, dbError, createdNow }
}
