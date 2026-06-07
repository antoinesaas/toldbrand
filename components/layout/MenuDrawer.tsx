'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RegionSelector from './RegionSelector'
import { useI18n } from '@/lib/i18n/use-i18n'

interface Props {
  open: boolean
  onClose: () => void
}

export default function MenuDrawer({ open, onClose }: Props) {
  const pathname = usePathname()
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true))
      })
    } else {
      setAnimateIn(false)
      document.body.style.overflow = ''
      const timer = setTimeout(() => setVisible(false), 320)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!visible) return null

  const NAV_LINKS = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shirts },
    { href: '/account/orders', label: 'Mon compte' },
    { href: 'mailto:antoine08.pro@gmail.com', label: t.nav.contact, external: true },
  ]

  const LEGAL_LINKS = [
    { href: '/legal/mentions-legales', label: t.menu.legal },
    { href: '/legal/cgu', label: t.menu.terms },
    { href: '/legal/confidentialite', label: t.menu.privacy },
  ]

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] backdrop-blur-md bg-black/60 transition-opacity duration-300 ease-out ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-[#111] z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          animateIn ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white"
          >
            {t.nav.close}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-0 border-b border-white/10 pb-6 mb-6">
            {NAV_LINKS.map(({ href, label, external }) => (
              <li key={href} className="border-b border-white/5 last:border-0">
                {external ? (
                  <a
                    href={href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 text-sm tracking-wide text-white hover:text-white/60"
                  >
                    {label}
                    <span className="text-white/20">›</span>
                  </a>
                ) : (
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center justify-between py-4 text-sm tracking-wide ${
                      pathname === href ? 'font-bold text-white' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {label}
                    <span className="text-white/20">›</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3">{t.menu.info}</p>
          <ul className="space-y-3 mb-8">
            {LEGAL_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="text-sm text-white/40 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" onClick={onClose} className="text-sm text-white/40 hover:text-white">
                {t.nav.cart}
              </Link>
            </li>
          </ul>

          <RegionSelector onSelect={onClose} />
        </nav>
      </aside>
    </>
  )
}
