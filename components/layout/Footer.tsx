import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-16 mt-auto">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div>
          <p className="text-2xl font-bold mb-3">TOLD—</p>
          <p className="text-xs text-white/50 max-w-xs leading-relaxed">
            Premium statement clothing. Say what you mean.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {[
            { href: '/shop', label: 'Shop' },
            { href: '/cart', label: 'Cart' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-white/10">
        <p className="text-[11px] text-white/30">
          © {new Date().getFullYear()} TOLD—. Printed in Europe via Gelato.
        </p>
      </div>
    </footer>
  )
}
