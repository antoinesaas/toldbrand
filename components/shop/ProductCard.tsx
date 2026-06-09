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
  const formatPrice = useFormatPrice()

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image block: mockup default → lifestyle on hover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#141414] rounded-xl mb-3">
        {/* Mockup */}
        <Image
          src={variant.front}
          alt={product.name}
          fill
          className="object-contain p-4 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 22vw"
        />
        {/* Lifestyle */}
        <Image
          src={variant.lifestyle}
          alt={`${product.name} — lifestyle`}
          fill
          className="object-cover object-top transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 22vw"
        />
        {/* Badge */}
        {product.compareAtPrice > product.price ? (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-bold uppercase px-2 py-0.5 tracking-widest">
            PROMO
          </span>
        ) : product.isNew ? (
          <span className="absolute top-2 left-2 bg-white text-black text-[8px] font-bold uppercase px-2 py-0.5 tracking-widest">
            NEW
          </span>
        ) : null}
      </div>

      {/* Info */}
      <div className="px-1">
        <h3 className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] leading-snug line-clamp-2">
          {product.name}
        </h3>
        {product.compareAtPrice > product.price ? (
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-red-400 text-xs font-semibold">{formatPrice(product.price)}</span>
            <span className="text-white/30 text-[10px] line-through">{formatPrice(product.compareAtPrice)}</span>
          </div>
        ) : (
          <p className="text-white/40 text-xs mt-1.5">{formatPrice(product.price)}</p>
        )}
        <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] mt-1">Stock limité</p>
      </div>
    </Link>
  )
}
