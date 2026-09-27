import { NextRequest, NextResponse } from 'next/server'
import { ensureOrderFromStripeSession } from '@/lib/ensure-order'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

/**
 * Appelé par la page /success. Ne crée PAS de commande Gelato : c'est le rôle du
 * webhook Stripe. La page et le webhook arrivent souvent en même temps — si les
 * deux créaient, on risquait deux t-shirts pour une vente.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    let userId: string | null = null
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      userId = user?.id ?? null
    } catch {
      // Auth indisponible : on continue en invité.
    }

    const { order, gelatoOrderId, dbError } = await ensureOrderFromStripeSession(sessionId, {
      userId,
      createGelato: false,
    })

    return NextResponse.json({
      order,
      gelatoOrderId,
      // Pas d'id Gelato ici = le webhook est encore en cours ; pas une erreur pour le client.
      gelatoError: null,
      pending: !gelatoOrderId,
      dbError,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load order'
    console.error('orders/confirm:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
