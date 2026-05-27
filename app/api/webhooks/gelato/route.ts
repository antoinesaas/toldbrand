import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // Gelato sends order status updates — log them for now
  const { event, order } = body as { event?: string; order?: { id?: string; status?: string } }

  console.log(`Gelato webhook: ${event} — order ${order?.id} → ${order?.status}`)

  // Future: update order status in your database, send shipping emails, etc.

  return NextResponse.json({ received: true })
}
