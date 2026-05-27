'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'
import CartItem from './CartItem'
import Button from '@/components/ui/Button'

export default function CartSummary() {
  const { items, total } = useCartStore()
  const cartTotal = total()

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  if (items.length === 0) {
    return (
      <div className="px-8 md:px-16 py-24 text-center">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light mb-6">
          Your bag is empty
        </p>
        <Link
          href="/shop"
          className="font-sans text-xs tracking-[0.2em] uppercase border border-ink px-8 py-3 hover:bg-ink hover:text-cream transition-colors"
        >
          Shop the collection
        </Link>
      </div>
    )
  }

  return (
    <div className="px-8 md:px-16 py-12">
      <div className="max-w-2xl">
        <div className="divide-y divide-gold/20">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="mt-12 pt-6 border-t border-gold/20 space-y-3">
          <div className="flex justify-between">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light">Subtotal</span>
            <span className="font-serif text-base text-ink">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light">Shipping</span>
            <span className="font-sans text-xs text-ink-light">Calculated at checkout</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gold/20">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-ink">Total</span>
            <span className="font-serif text-xl text-ink">{formatPrice(cartTotal)}</span>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleCheckout} variant="primary" fullWidth>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
