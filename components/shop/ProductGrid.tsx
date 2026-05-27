import type { Product } from '@/types'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light">
          No products available
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
