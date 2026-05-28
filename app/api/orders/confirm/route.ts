import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    const admin = createAdminClient()
    const { data: order, error } = await admin
      .from('orders')
      .select('*, order_items(*)')
      .eq('stripe_session_id', sessionId)
      .maybeSingle()

    if (error) throw error

    return NextResponse.json({ order })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load order'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
