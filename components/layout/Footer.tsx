import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream py-16 px-8 md:px-16 mt-auto">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Wordmark */}
        <div>
          <p className="font-serif text-3xl mb-3">Told—</p>
          <p className="font-sans text-xs text-cream/40 max-w-xs leading-relaxed">
            Premium statement clothing. Say what you mean.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/cart', label: 'Cart' },
            { href: '/shipping', label: 'Shipping' },
            { href: '/returns', label: 'Returns' },
            { href: '/contact', label: 'Contact' },
            { href: '/privacy', label: 'Privacy' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-sans text-xs tracking-[0.15em] uppercase text-cream/50 hover:text-cream transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-2">
        <p className="font-sans text-[11px] text-cream/30">
          © {new Date().getFullYear()} Told—. All rights reserved.
        </p>
        <p className="font-sans text-[11px] text-cream/30">
          Printed in Europe · Organic cotton
        </p>
      </div>
    </footer>
  )
}
