'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { useI18n } from '@/lib/i18n/use-i18n'
import { useFormatPrice } from '@/lib/use-format-price'
import CartItem from './CartItem'
import PaymentIcons from '@/components/shop/PaymentIcons'

const FREE_SHIPPING_THRESHOLD = 6000

export default function CartSummary() {
  const { items, total } = useCartStore()
  const { t, currency, country, language } = useI18n()
  const formatPrice = useFormatPrice()
  const cartTotal = total()
  const freeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency, country, language }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else alert(data.error ?? 'Paiement indisponible')
  }

  if (items.length === 0) {
    return (
      <div className="px-8 md:px-16 py-24 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6">{t.cart.empty}</p>
        <Link
          href="/shop"
          className="text-xs tracking-[0.2em] uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
        >
          {t.cart.viewCollection}
        </Link>
      </div>
    )
  }

  return (
    <div className="px-8 md:px-16 py-12 max-w-2xl mx-auto">
      <div className="divide-y divide-neutral-100">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-neutral-100 space-y-3">
        {!freeShipping && (
          <p className="text-xs text-neutral-500 text-center">
            {t.cart.freeShippingFrom.replace('{amount}', formatPrice(FREE_SHIPPING_THRESHOLD))}
          </p>
        )}
        {freeShipping && (
          <p className="text-xs text-emerald-700 text-center font-medium">{t.cart.freeShipping}</p>
        )}
        <div className="flex justify-between">
          <span className="text-xs tracking-[0.15em] uppercase text-neutral-500">{t.cart.subtotal}</span>
          <span className="text-base font-medium">{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-neutral-100">
          <span className="text-xs tracking-[0.15em] uppercase">{t.cart.total}</span>
          <span className="text-xl font-medium">{formatPrice(cartTotal)}</span>
        </div>
      </div>

      <PaymentIcons className="mt-6" />
      <button
        type="button"
        onClick={handleCheckout}
        className="mt-6 w-full h-12 bg-black text-white text-xs uppercase tracking-[0.15em] hover:bg-neutral-800"
      >
        {t.cart.pay}
      </button>
    </div>
  )
}
