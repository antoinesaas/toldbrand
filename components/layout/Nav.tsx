'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { count, toggleCart } = useCartStore()
  const cartCount = count()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-8 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 md:px-16 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      {/* Left: nav links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/shop"
          className="font-sans text-xs tracking-[0.2em] uppercase text-inherit hover:text-ink-light transition-colors"
          style={{ color: scrolled ? 'var(--ink)' : 'var(--white)' }}
        >
          Shop
        </Link>
      </div>

      {/* Center: wordmark */}
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-tight"
        style={{ color: scrolled ? 'var(--ink)' : 'var(--white)' }}
      >
        Told—
      </Link>

      {/* Right: cart */}
      <div className="flex items-center gap-6 ml-auto">
        <button
          onClick={toggleCart}
          className="font-sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 transition-colors"
          style={{ color: scrolled ? 'var(--ink)' : 'var(--white)' }}
          aria-label="Open cart"
        >
          Bag
          {cartCount > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 bg-ink text-cream text-[10px] font-sans rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
