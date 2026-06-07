'use client'

import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header minimal */}
        <div className="mb-10 md:mb-14">
          <p className="text-white/30 text-[9px] uppercase tracking-[0.4em]">TOLD— · EST. 2025</p>
          <h1 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight mt-2">
            Meme Couture.
          </h1>
        </div>

        {/* Grid — 10 produits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
