'use client'

import Image from 'next/image'
import type { CartItem as CartItemType } from '@/types'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'

interface Props {
  item: CartItemType
}

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative w-16 h-20 bg-cream-dark flex-shrink-0">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
        ) : (
          <div className="absolute inset-0 bg-cream-dark" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink leading-relaxed truncate">
          {item.name}
        </p>
        <p className="font-sans text-[10px] text-ink-light mt-0.5 capitalize">
          {item.color} · {item.size}
        </p>
        <p className="font-serif text-sm text-ink mt-1">{formatPrice(item.price)}</p>

        {/* Qty + remove */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gold/30">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 font-sans text-xs text-ink-light hover:text-ink flex items-center justify-center"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-7 h-7 font-sans text-xs text-ink flex items-center justify-center border-x border-gold/30">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 font-sans text-xs text-ink-light hover:text-ink flex items-center justify-center"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="font-sans text-[10px] tracking-[0.1em] uppercase text-ink-light hover:text-ink transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
