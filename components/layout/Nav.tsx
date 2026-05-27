'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shirts' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { count, toggleCart } = useCartStore()
  const cartCount = count()
  const isHome = pathname === '/'
  const lightOnDark = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textClass = lightOnDark ? 'text-white' : 'text-black'
  const navBg = scrolled || !isHome ? 'bg-white/95 backdrop-blur border-b border-neutral-100' : 'bg-transparent'

  return (
    <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="max-w-[1400px] mx-auto h-16 flex items-center justify-between px-4 md:px-8">
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity ${textClass}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className={`absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight ${textClass}`}
        >
          TOLD—
        </Link>

        <div className="flex items-center gap-6 ml-auto">
          <span className={`hidden sm:inline text-xs ${textClass}`}>EUR</span>
          <button
            type="button"
            onClick={toggleCart}
            className={`text-xs tracking-[0.15em] uppercase flex items-center gap-2 ${textClass}`}
            aria-label="Open cart"
          >
            Bag
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-black text-white text-[10px] rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
