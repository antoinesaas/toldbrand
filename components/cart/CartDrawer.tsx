'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { useI18n } from '@/lib/i18n/use-i18n'
import { useFormatPrice } from '@/lib/use-format-price'
import CartItem from './CartItem'
import PaymentIcons from '@/components/shop/PaymentIcons'
import { isCheckoutFreeShipping, FREE_SHIPPING_MIN_QUANTITY } from '@/lib/shipping-config'
import { pixelInitiateCheckout } from '@/lib/pixel'
import { PRODUCTS } from '@/lib/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, count } = useCartStore()
  const { t, currency, country, language } = useI18n()
  const formatPrice = useFormatPrice()
  const cartTotal = total()
  const cartCount = count()
  const freeShipping = isCheckoutFreeShipping(cartCount)
  const itemsNeeded = Math.max(0, FREE_SHIPPING_MIN_QUANTITY - cartCount)

  const cartProductIds = new Set(items.map((i) => i.productId))
  const suggestions = PRODUCTS.filter((p) => !cartProductIds.has(p.id)).slice(0, 4)

  async function handleCheckout() {
    pixelInitiateCheckout(cartTotal, 'EUR', cartCount)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency, country, language }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert(data.error ?? 'Paiement indisponible')
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/60 z-[80]"
          onClick={closeCart}
          aria-hidden
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#111] z-[90] flex flex-col shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-baseline justify-between px-6 py-6 border-b border-white/10 pt-24">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-medium text-white">{t.cart.title}</p>
            <p className="text-xs text-white/40 mt-0.5">
              {cartCount} {t.cart.articles}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white"
          >
            {t.cart.close}
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {/* You might also like */}
          {suggestions.length > 0 && (
            <div className="px-6 pt-5 pb-4 border-b border-white/10">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3">
                Vous aimeriez aussi
              </p>
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={closeCart}
                    className="flex-none w-[90px] group"
                  >
                    <div className="relative aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden mb-2">
                      <Image
                        src={p.variants[0].lifestyle}
                        alt={p.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        sizes="90px"
                      />
                    </div>
                    <p className="text-[9px] tracking-[0.1em] uppercase text-white/60 truncate leading-tight">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-white/40 mt-0.5">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="py-4 px-6">
            {items.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <p className="text-xs tracking-[0.15em] uppercase text-white/30">{t.cart.empty}</p>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-6 space-y-4">
            {!freeShipping && itemsNeeded > 0 && (
              <p className="text-[11px] text-white/40 text-center">
                Plus que {itemsNeeded} T-shirt{itemsNeeded > 1 ? 's' : ''} pour la livraison offerte
              </p>
            )}
            {freeShipping && (
              <p className="text-[11px] text-emerald-400 text-center font-medium">
                Livraison offerte
              </p>
            )}
            <div className="flex justify-between items-baseline">
              <p className="text-xs tracking-[0.15em] uppercase text-white/40">{t.cart.total}</p>
              <p className="text-lg font-medium text-white">{formatPrice(cartTotal)}</p>
            </div>
            <PaymentIcons />
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full h-12 bg-white text-black text-xs font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors"
            >
              {t.cart.pay}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
