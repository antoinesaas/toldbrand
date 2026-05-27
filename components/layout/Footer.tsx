import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
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
          <p className="text-xs text-white/50 max-w-xs mx-auto md:mx-0 leading-relaxed">
            Vêtements statement premium. Dites ce que vous pensez.
          </p>
        </div>

        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">Boutique</p>
          <ul className="space-y-2">
            {[
              { href: '/shop', label: 'T-shirts' },
              { href: '/cart', label: 'Panier' },
              { href: 'mailto:antoine08.pro@gmail.com', label: 'Nous contacter' },
            ].map(({ href, label }) => (
              <li key={href}>
                {href.startsWith('mailto') ? (
                  <a href={href} className="text-xs text-white/50 hover:text-white">
                    {label}
                  </a>
                ) : (
                  <Link href={href} className="text-xs text-white/50 hover:text-white">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">Légal</p>
          <ul className="space-y-2">
            {[
              { href: '/legal/mentions-legales', label: 'Mentions légales' },
              { href: '/legal/cgu', label: 'CGU' },
              { href: '/legal/confidentialite', label: 'Confidentialité' },
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
          © {new Date().getFullYear()} TOLD. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
