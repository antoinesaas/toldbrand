'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/cart-store'

interface Props {
  onAddToCart: () => void
  onBuyNow: () => void
  disabled?: boolean
  loading?: boolean
}

export default function StickyMobileCTA({ onAddToCart, onBuyNow, disabled, loading }: Props) {
  const [visible, setVisible] = useState(false)
  const cartOpen = useCartStore((s) => s.isOpen)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)

    const onScroll = () => {
      if (window.scrollY > 200) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  if (!visible || cartOpen) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 flex gap-2">
      <button
        type="button"
        onClick={onAddToCart}
        disabled={disabled || loading}
        className="flex-1 h-11 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.12em] rounded-full disabled:opacity-30"
      >
        Ajouter
      </button>
      <button
        type="button"
        onClick={onBuyNow}
        disabled={disabled || loading}
        className="flex-1 h-11 bg-white text-black text-xs font-bold uppercase tracking-[0.12em] rounded-full disabled:opacity-30"
      >
        {loading ? '...' : 'Acheter'}
      </button>
    </div>
  )
}
