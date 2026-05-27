import { NextResponse } from 'next/server'
import { getGelatoProducts } from '@/lib/gelato'

/** Lists Gelato catalog products — use to copy product UIDs into env vars */
export async function GET() {
  if (!process.env.GELATO_API_KEY) {
    return NextResponse.json({ error: 'GELATO_API_KEY not set' }, { status: 503 })
  }

  try {
    const products = await getGelatoProducts()
    return NextResponse.json(products)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
