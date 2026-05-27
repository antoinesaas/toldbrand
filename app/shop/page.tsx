import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'
import ProductGrid from '@/components/shop/ProductGrid'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse all Told— statement tees.',
}

export default function ShopPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <div className="px-8 md:px-16 py-12 border-b border-gold/30">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink-light mb-3">
          All products
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">The Collection</h1>
        <p className="font-sans text-sm text-ink-light mt-3">
          {PRODUCTS.length} statement tees
        </p>
      </div>

      {/* Grid */}
      <div className="px-8 md:px-16 py-16">
        <ProductGrid products={PRODUCTS} />
      </div>
    </div>
  )
}
