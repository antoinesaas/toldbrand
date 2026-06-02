import { NextRequest, NextResponse } from 'next/server'
import {
  isGelatoDashboardTestPayload,
  updateOrderFromGelatoWebhook,
} from '@/lib/orders'

/** Gelato requires HTTP 2xx — including dashboard test payloads with {{MyOrderId}}. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const isTest = isGelatoDashboardTestPayload(body)

  try {
    const result = await updateOrderFromGelatoWebhook(body)
    console.log('Gelato webhook:', body.event, 'matched:', result.matched, result.orderId ?? '—')
    return NextResponse.json({
      received: true,
      matched: result.matched,
      orderId: result.orderId ?? null,
      test: isTest || undefined,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Gelato webhook error:', message, body)

    if (isTest) {
      return NextResponse.json({
        received: true,
        matched: false,
        test: true,
        note: 'Test payload acknowledged (no order in database)',
      })
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
