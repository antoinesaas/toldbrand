import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types'
import type { CountryCode, Currency } from '@/lib/locale-store'

const FREE_SHIPPING_THRESHOLD_CENTS = 6000
const STANDARD_SHIPPING_CENTS = 495

const COUNTRY_SHIPPING: Record<string, string[]> = {
  EUR: ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'PT', 'AT', 'IE', 'PL', 'CH', 'LU'],
  GBP: ['GB'],
  USD: ['US'],
}

function baseUrl() {
  return process.env.NEXT_PUBLIC_URL?.replace(/\s/g, '') || 'https://toldbrand.vercel.app'
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
  }

  let body: {
    items: CartItem[]
    currency?: Currency
    country?: CountryCode
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { items, currency = 'EUR', country = 'FR' } = body

  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD_CENTS
  const url = baseUrl()

  const allowedCountries =
    COUNTRY_SHIPPING[currency] ?? [...COUNTRY_SHIPPING.EUR, ...COUNTRY_SHIPPING.GBP, ...COUNTRY_SHIPPING.USD]

  const defaultGelatoUid =
    process.env.GELATO_DEFAULT_PRODUCT_UID ||
    'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_m_gco_white_gpr_4-4'

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: `${item.name} — ${item.colorLabel} / ${item.size}`,
            images: item.imageUrl ? [`${url}${item.imageUrl}`] : [],
            metadata: {
              gelatoProductUid: item.gelatoProductUid || defaultGelatoUid,
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
      locale: currency === 'EUR' ? 'fr' : currency === 'GBP' ? 'en-GB' : 'en',
      shipping_address_collection: {
        allowed_countries: allowedCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: freeShipping
        ? [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: 0, currency: currency.toLowerCase() },
                display_name: 'Livraison offerte',
                delivery_estimate: {
                  minimum: { unit: 'business_day', value: 3 },
                  maximum: { unit: 'business_day', value: 7 },
                },
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: STANDARD_SHIPPING_CENTS,
                  currency: currency.toLowerCase(),
                },
                display_name: 'Livraison standard',
                delivery_estimate: {
                  minimum: { unit: 'business_day', value: 3 },
                  maximum: { unit: 'business_day', value: 7 },
                },
              },
            },
          ],
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/cart`,
      metadata: {
        source: 'toldbrand-store',
        currency,
        country,
        freeShipping: freeShipping ? 'yes' : 'no',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
