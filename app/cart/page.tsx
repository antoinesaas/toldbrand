import type { Metadata } from 'next'
import CartSummary from '@/components/cart/CartSummary'

export const metadata: Metadata = {
  title: 'Cart',
}

export default function CartPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="px-8 md:px-16 py-12 border-b border-gold/30">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink-light mb-3">
          Your bag
        </p>
        <h1 className="font-serif text-4xl text-ink">Cart</h1>
      </div>
      <CartSummary />
    </div>
  )
}
