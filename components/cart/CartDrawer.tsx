'use client'

import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'
import CartItem from './CartItem'
import Button from '@/components/ui/Button'

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
    if (data.url) window.location.href = data.url
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/30 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-cream z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-baseline justify-between px-6 py-6 border-b border-gold/20">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light">
              Your bag
            </p>
            <p className="font-sans text-xs text-ink-light mt-0.5">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light hover:text-ink transition-colors"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light">
                Your bag is empty
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gold/10">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold/20 px-6 py-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light">Total</p>
              <p className="font-serif text-lg text-ink">{formatPrice(cartTotal)}</p>
            </div>
            <p className="font-sans text-[10px] text-ink-light">
              Shipping calculated at checkout
            </p>
            <Button onClick={handleCheckout} variant="primary" fullWidth>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
