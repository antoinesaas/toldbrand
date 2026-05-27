import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/products'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const variant = product.variants[0]
  const onSale = product.compareAtPrice > product.price

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden mb-3">
        <Image
          src={variant.back}
          alt={product.name}
          fill
          className="object-contain object-center p-4 group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {onSale && (
          <span className="absolute top-3 right-3 bg-black text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      <h3 className="text-xs font-bold uppercase tracking-wide text-black line-clamp-2">
        {product.name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
        {onSale && (
          <span className="text-xs text-neutral-400 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>
      {product.variants.length > 1 && (
        <div className="flex gap-1.5 mt-2">
          {product.variants.map((v) => (
            <span
              key={v.color}
              className="w-4 h-4 rounded-full border border-neutral-200"
              style={{ backgroundColor: v.hex }}
              title={v.label}
            />
          ))}
        </div>
      )}
    </Link>
  )
}
