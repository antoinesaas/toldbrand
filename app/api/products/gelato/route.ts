import { NextResponse } from 'next/server'
import { getGelatoCustomerProducts } from '@/lib/gelato'

/** Lists Gelato customer products — use to copy productUid(s) into env vars */
export async function GET() {
  if (!process.env.GELATO_API_KEY) {
    return NextResponse.json({ error: 'GELATO_API_KEY not set' }, { status: 503 })
  }

  try {
    const products = await getGelatoCustomerProducts()
    return NextResponse.json(products)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
