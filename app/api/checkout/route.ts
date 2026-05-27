import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types'

export async function POST(req: NextRequest) {
  const { items }: { items: CartItem[] } = await req.json()

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.imageUrl ? [`${process.env.NEXT_PUBLIC_URL}${item.imageUrl}`] : [],
          metadata: {
            gelatoProductId: item.gelatoProductId,
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
      allowed_countries: ['FR', 'DE', 'GB', 'IT', 'ES', 'NL', 'BE', 'PT', 'US', 'CA', 'AU', 'CH', 'AT', 'SE', 'DK'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'eur' },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    metadata: {
      source: 'toldbrand-store',
    },
  })

  return NextResponse.json({ url: session.url })
}
