'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/use-i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-black text-white py-16 px-6 md:px-16 mt-auto">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center md:text-left">
          <Image
            src="/branding/logo.png"
            alt="TOLD"
            width={100}
            height={28}
            className="h-6 w-auto mx-auto md:mx-0 mb-4 brightness-0 invert"
          />
          <p className="text-xs text-white/50 max-w-xs mx-auto md:mx-0 leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">{t.footer.shop}</p>
          <ul className="space-y-2">
            {[
              { href: '/shop', label: t.nav.shirts },
              { href: '/cart', label: t.nav.cart },
              { href: '/contact', label: t.nav.contact },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-xs text-white/50 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">{t.footer.legal}</p>
          <ul className="space-y-2">
            {[
              { href: '/legal/mentions-legales', label: t.menu.legal },
              { href: '/legal/cgu', label: t.menu.terms },
              { href: '/legal/confidentialite', label: t.menu.privacy },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-xs text-white/50 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-white/10 text-center">
        <p className="text-[11px] text-white/30">
          © {new Date().getFullYear()} TOLD. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
