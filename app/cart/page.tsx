import type { Metadata } from 'next'
import CartSummary from '@/components/cart/CartSummary'

export const metadata: Metadata = {
  title: 'Panier',
}

export default function CartPage() {
  return (
    <div className="pt-[100px] min-h-screen">
      <div className="px-8 md:px-16 py-8 text-center border-b border-neutral-100">
        <h1 className="text-sm font-medium uppercase tracking-[0.25em]">Panier</h1>
      </div>
      <CartSummary />
    </div>
  )
}
