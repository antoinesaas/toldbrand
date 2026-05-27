import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'
import ProductGrid from '@/components/shop/ProductGrid'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse all TOLD— statement tees.',
}

export default function ShopPage() {
  return (
    <div className="pt-28 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 border-b border-neutral-100">
        <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-3">All products</p>
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">The Collection</h1>
        <p className="text-sm text-neutral-500 mt-3">{PRODUCTS.length} statement tees</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16">
        <ProductGrid products={PRODUCTS} />
      </div>
    </div>
  )
}
