'use client'

import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'
import CartItem from './CartItem'

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, count } = useCartStore()
  const cartTotal = total()
  const cartCount = count()

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else if (data.error) {
      alert(data.error)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closeCart} aria-hidden />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-baseline justify-between px-6 py-6 border-b border-neutral-100">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-semibold">Your bag</p>
            <p className="text-xs text-neutral-400 mt-0.5">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-black"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400">Your bag is empty</p>
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
            <div className="flex justify-between items-baseline">
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-500">Total</p>
              <p className="text-lg font-semibold">{formatPrice(cartTotal)}</p>
            </div>
            <p className="text-[10px] text-neutral-400">Shipping calculated at checkout (Stripe)</p>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full h-12 bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
