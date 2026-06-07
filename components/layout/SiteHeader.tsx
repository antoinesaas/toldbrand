'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/cart-store'
import AnnouncementBar from './AnnouncementBar'
import MenuDrawer from './MenuDrawer'
import RegionSelector from './RegionSelector'
import { useI18n } from '@/lib/i18n/use-i18n'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useI18n()
  const { count, toggleCart } = useCartStore()
  const cartCount = count()
  const isHome = pathname === '/'
  const lightOnDark = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const textClass = 'text-white'
  const navBg = scrolled
    ? 'bg-[#0a0a0a]/95 backdrop-blur border-b border-white/10'
    : 'bg-transparent'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar light={lightOnDark} />
        <div className={`transition-colors duration-300 ${navBg}`}>
          <nav className="max-w-[1400px] mx-auto h-14 md:h-16 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-8 min-w-0">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`flex flex-col gap-1.5 p-2 -ml-1 shrink-0 ${textClass}`}
              aria-label="Ouvrir le menu"
            >
              <span className="block w-5 h-px bg-white" />
              <span className="block w-5 h-px bg-white" />
            </button>

            <Link href="/" className="justify-self-center shrink-0 px-1">
              <Image
                src="/branding/logo.png"
                alt="TOLD"
                width={120}
                height={32}
                className="h-5 sm:h-6 md:h-7 w-auto max-w-[92px] sm:max-w-[120px] object-contain brightness-0 invert"
                priority
              />
            </Link>

            <div className={`justify-self-end flex items-center justify-end gap-1.5 sm:gap-2 md:gap-5 min-w-0 shrink-0 ${textClass}`}>
              <Link
                href="/account/orders"
                className="md:hidden p-2 -mr-1 shrink-0 hover:opacity-70"
                aria-label="Mon compte"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-5 h-5"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                  />
                </svg>
              </Link>
              <Link
                href="/account/orders"
                className="hidden md:inline text-xs tracking-[0.15em] uppercase hover:opacity-70 whitespace-nowrap"
              >
                Compte
              </Link>
              <div className="hidden sm:block shrink-0">
                <RegionSelector compact light={lightOnDark} />
              </div>
              <button
                type="button"
                onClick={toggleCart}
                className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                aria-label="Panier"
              >
                {t.nav.cart}
                {cartCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] rounded-full bg-white text-black"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
