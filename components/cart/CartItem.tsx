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
      <div className="relative w-16 h-20 bg-neutral-50 flex-shrink-0 overflow-hidden">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" sizes="64px" />
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.1em] uppercase font-semibold leading-relaxed truncate">
          {item.name}
        </p>
        <p className="text-[10px] text-neutral-500 mt-0.5">
          {item.colorLabel} · {item.size}
        </p>
        <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-neutral-200">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 text-xs text-neutral-500 hover:text-black"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-7 h-7 text-xs flex items-center justify-center border-x border-neutral-200">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 text-xs text-neutral-500 hover:text-black"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-[10px] uppercase text-neutral-400 hover:text-black"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
