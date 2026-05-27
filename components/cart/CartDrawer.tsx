'use client'

import { useCartStore } from '@/lib/cart-store'
import { useLocaleStore } from '@/lib/locale-store'
import { useFormatPrice } from '@/lib/use-format-price'
import CartItem from './CartItem'
import PaymentIcons from '@/components/shop/PaymentIcons'

const FREE_SHIPPING_THRESHOLD = 6000

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, count } = useCartStore()
  const { currency, country } = useLocaleStore()
  const formatPrice = useFormatPrice()
  const cartTotal = total()
  const cartCount = count()
  const freeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency, country }),
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
        <div className="fixed inset-0 bg-black/40 z-[80]" onClick={closeCart} aria-hidden />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[90] flex flex-col shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-baseline justify-between px-6 py-6 border-b border-neutral-100 pt-24">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-medium">Panier</p>
            <p className="text-xs text-neutral-400 mt-0.5">
              {cartCount} article{cartCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-black"
          >
            Fermer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs tracking-[0.15em] uppercase text-neutral-400">Panier vide</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-neutral-100 px-6 py-6 space-y-4">
            {!freeShipping && (
              <p className="text-[11px] text-neutral-500 text-center">
                Plus que {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)} pour la livraison offerte
              </p>
            )}
            {freeShipping && (
              <p className="text-[11px] text-emerald-700 text-center font-medium">
                Livraison offerte
              </p>
            )}
            <div className="flex justify-between items-baseline">
              <p className="text-xs tracking-[0.15em] uppercase text-neutral-500">Total</p>
              <p className="text-lg font-medium">{formatPrice(cartTotal)}</p>
            </div>
            <PaymentIcons />
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full h-12 bg-black text-white text-xs font-medium uppercase tracking-[0.15em] hover:bg-neutral-800"
            >
              Payer
            </button>
          </div>
        )}
      </div>
    </>
  )
}
