import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types'
import { REGIONS, type CountryCode, type Currency } from '@/lib/locale-store'
import { resolveOrderItem, baseUrl } from '@/lib/resolve-order-item'
import { getStripeLocale } from '@/lib/i18n/stripe-locale'
import type { Language } from '@/lib/i18n/translations'
import {
  isCheckoutFreeShipping,
  STANDARD_SHIPPING_CENTS,
} from '@/lib/shipping-config'

const COUNTRY_SHIPPING: Record<string, string[]> = {
  EUR: ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'PT', 'AT', 'IE', 'PL', 'CH', 'LU'],
  GBP: ['GB'],
  USD: ['US'],
}

const SHIPPING_LABELS: Record<Language, { free: string; standard: string }> = {
  fr: { free: 'Livraison offerte', standard: 'Livraison standard' },
  en: { free: 'Free shipping', standard: 'Standard shipping' },
  de: { free: 'Kostenloser Versand', standard: 'Standardversand' },
  it: { free: 'Spedizione gratuita', standard: 'Spedizione standard' },
  es: { free: 'Envío gratis', standard: 'Envío estándar' },
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
  }

  let body: {
    items: CartItem[]
    currency?: Currency
    country?: CountryCode
    language?: Language
    userId?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { items, currency = 'EUR', country = 'FR', language: bodyLanguage } = body

  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Connexion requise pour payer et suivre votre commande.', loginRequired: true },
      { status: 401 }
    )
  }

  const userId = user.id

  const region = REGIONS.find((r) => r.country === country) ?? REGIONS[0]
  const language = bodyLanguage ?? region.language
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0)
  const freeShipping = isCheckoutFreeShipping(totalQty)
  const url = baseUrl()
  const shippingLabels = SHIPPING_LABELS[language]

  const allowedCountries =
    COUNTRY_SHIPPING[currency] ?? [...COUNTRY_SHIPPING.EUR, ...COUNTRY_SHIPPING.GBP, ...COUNTRY_SHIPPING.USD]

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email ?? undefined,
      payment_intent_data: user.email
        ? { receipt_email: user.email }
        : undefined,
      line_items: items.map((item) => {
        const resolved = resolveOrderItem(item)
        return {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `${resolved.productName} — ${resolved.variantLabel} / ${item.size}`,
              images: item.imageUrl ? [`${url}${item.imageUrl}`] : [],
              metadata: {
                gelatoProductUid: resolved.productUid,
                productId: item.productId,
                size: item.size,
                color: item.color,
                colorLabel: item.colorLabel,
                imageUrl: item.imageUrl,
                printFront: resolved.printFiles[0]?.url ?? '',
                printBack: resolved.printFiles[1]?.url ?? '',
              },
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        }
      }),
      mode: 'payment',
      allow_promotion_codes: true,
      locale: getStripeLocale(language),
      shipping_address_collection: {
        allowed_countries: allowedCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: freeShipping
        ? [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: { amount: 0, currency: currency.toLowerCase() },
                display_name: shippingLabels.free,
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
                display_name: shippingLabels.standard,
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
        language,
        freeShipping: freeShipping ? 'yes' : 'no',
        supabase_user_id: userId ?? '',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    console.error('Stripe checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
