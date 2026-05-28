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

  const textClass = lightOnDark ? 'text-white' : 'text-black'
  const navBg =
    scrolled || !isHome
      ? 'bg-white/98 backdrop-blur border-b border-neutral-100'
      : 'bg-transparent'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar light={lightOnDark} />
        <div className={`transition-colors duration-300 ${navBg}`}>
          <nav className="max-w-[1400px] mx-auto h-14 md:h-16 grid grid-cols-3 items-center px-4 md:px-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`flex flex-col gap-1.5 p-2 -ml-2 ${textClass}`}
              aria-label="Ouvrir le menu"
            >
              <span className={`block w-5 h-px ${lightOnDark ? 'bg-white' : 'bg-black'}`} />
              <span className={`block w-5 h-px ${lightOnDark ? 'bg-white' : 'bg-black'}`} />
            </button>

            <Link href="/" className="justify-self-center">
              <Image
                src="/branding/logo.png"
                alt="TOLD"
                width={120}
                height={32}
                className={`h-6 md:h-7 w-auto object-contain ${lightOnDark ? 'brightness-0 invert' : ''}`}
                priority
              />
            </Link>

            <div className={`justify-self-end flex items-center gap-3 md:gap-5 ${textClass}`}>
              <Link
                href="/account/orders"
                className="hidden sm:inline text-xs tracking-[0.15em] uppercase hover:opacity-70"
              >
                Compte
              </Link>
              <RegionSelector compact light={lightOnDark} />
              <button
                type="button"
                onClick={toggleCart}
                className="text-xs tracking-[0.15em] uppercase flex items-center gap-2"
                aria-label="Panier"
              >
                {t.nav.cart}
                {cartCount > 0 && (
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] rounded-full ${
                      lightOnDark ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
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
