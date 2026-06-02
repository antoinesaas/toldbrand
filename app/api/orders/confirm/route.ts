import { NextRequest, NextResponse } from 'next/server'
import { ensureOrderFromStripeSession } from '@/lib/ensure-order'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { order, gelatoOrderId, gelatoError } = await ensureOrderFromStripeSession(sessionId, {
      userId: user?.id ?? null,
    })

    return NextResponse.json({ order, gelatoOrderId, gelatoError })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load order'
    console.error('orders/confirm:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
