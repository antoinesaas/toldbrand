'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { useFormatPrice } from '@/lib/use-format-price'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const variant = product.variants[0]
  const onSale = product.compareAtPrice > product.price
  const formatPrice = useFormatPrice()

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-4 rounded-2xl">
        <Image
          src={variant.back}
          alt={product.name}
          fill
          className="object-contain object-center p-2 group-hover:opacity-95 transition-opacity duration-500"
          sizes="(max-width: 768px) 50vw, 400px"
        />
        {onSale && (
          <span className="absolute top-2 right-2 bg-black text-white text-[9px] font-medium uppercase px-2 py-0.5 tracking-wider">
            Sale
          </span>
        )}
      </div>
      <div className="text-center">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.15em] text-black line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm">{formatPrice(product.price)}</span>
          {onSale && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {product.variants.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {product.variants.map((v) => (
              <span
                key={v.color}
                className="w-3 h-3 rounded-full border border-neutral-200"
                style={{ backgroundColor: v.hex }}
                title={v.label}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
