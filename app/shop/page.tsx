import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'

export const metadata: Metadata = {
  title: 'Shop',
  description: '10 tees. Zéro filtre.',
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10 border-b border-white/10 pb-6">
          <p className="text-white/30 text-[9px] uppercase tracking-[0.4em] mb-2">La collection</p>
          <h1 className="text-white text-2xl font-bold uppercase tracking-tight">
            {PRODUCTS.length} tees. Zéro filtre.
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
