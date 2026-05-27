import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types'

const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

export async function POST(req: NextRequest) {
  const { items }: { items: CartItem[] } = await req.json()

  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const missingGelato = items.filter((i) => !i.gelatoProductUid)
  if (missingGelato.length > 0) {
    return NextResponse.json(
      {
        error:
          'Gelato product UIDs not configured. Set GELATO_UID_* env vars in Vercel.',
      },
      { status: 503 }
    )
  }

  const session = await stripe.checkout.sessions.create({
    line_items: items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.name} — ${item.colorLabel} / ${item.size}`,
          images: item.imageUrl ? [`${baseUrl}${item.imageUrl}`] : [],
          metadata: {
            gelatoProductUid: item.gelatoProductUid,
            productId: item.productId,
            size: item.size,
            color: item.color,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: [
        'FR',
        'DE',
        'GB',
        'IT',
        'ES',
        'NL',
        'BE',
        'PT',
        'US',
        'CA',
        'AU',
        'CH',
        'AT',
        'SE',
        'DK',
        'PL',
        'IE',
      ],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 495, currency: 'eur' },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
    metadata: {
      source: 'toldbrand-store',
    },
  })

  return NextResponse.json({ url: session.url })
}
