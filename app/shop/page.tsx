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
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 border-b border-neutral-100 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-3">Boutique</p>
        <h1 className="text-sm font-medium uppercase tracking-[0.25em]">La collection</h1>
        <p className="text-xs text-neutral-500 mt-3">{PRODUCTS.length} t-shirts</p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16">
        <ProductGrid products={PRODUCTS} />
      </div>
    </div>
  )
}
