'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RegionSelector from './RegionSelector'

interface Props {
  open: boolean
  onClose: () => void
}

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/shop', label: 'T-shirts' },
  { href: 'mailto:antoine08.pro@gmail.com', label: 'Nous contacter', external: true },
]

const LEGAL_LINKS = [
  { href: '/legal/mentions-legales', label: 'Mentions légales' },
  { href: '/legal/cgu', label: 'Conditions générales' },
  { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
]

export default function MenuDrawer({ open, onClose }: Props) {
  const pathname = usePathname()

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60]" onClick={onClose} aria-hidden />
      <aside className="fixed top-0 left-0 h-full w-full max-w-sm bg-white z-[70] flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="text-xs tracking-[0.15em] uppercase text-neutral-600 hover:text-black"
          >
            Fermer
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-0 border-b border-neutral-100 pb-6 mb-6">
            {NAV_LINKS.map(({ href, label, external }) => (
              <li key={href} className="border-b border-neutral-50 last:border-0">
                {external ? (
                  <a
                    href={href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 text-sm tracking-wide hover:text-neutral-600"
                  >
                    {label}
                    <span className="text-neutral-300">›</span>
                  </a>
                ) : (
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center justify-between py-4 text-sm tracking-wide ${
                      pathname === href ? 'font-semibold' : 'hover:text-neutral-600'
                    }`}
                  >
                    {label}
                    <span className="text-neutral-300">›</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">Informations</p>
          <ul className="space-y-3 mb-8">
            {LEGAL_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="text-sm text-neutral-600 hover:text-black"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" onClick={onClose} className="text-sm text-neutral-600 hover:text-black">
                Panier
              </Link>
            </li>
          </ul>

          <RegionSelector onSelect={onClose} />
        </nav>
      </aside>
    </>
  )
}
