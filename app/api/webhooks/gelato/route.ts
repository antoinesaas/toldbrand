import { NextRequest, NextResponse } from 'next/server'
import { updateOrderFromGelatoWebhook } from '@/lib/orders'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  try {
    const updated = await updateOrderFromGelatoWebhook(body)
    console.log('Gelato webhook processed:', body.event ?? 'status_update', updated?.id)
    return NextResponse.json({ received: true, orderId: updated?.id })
  } catch (err) {
    console.error('Gelato webhook error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Update failed' },
      { status: 500 }
    )
  }
}
