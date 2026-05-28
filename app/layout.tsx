import type { Metadata } from 'next'
import { Inter, Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import LocaleSync from '@/components/layout/LocaleSync'
import VercelAnalytics from '@/components/analytics/VercelAnalytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['200', '300', '400'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? 'https://toldbrand.vercel.app'),
  title: {
    default: 'TOLD — Statement Clothing',
    template: '%s | TOLD',
  },
  description:
    'T-shirts statement premium. Coupe relax unisexe, coton bio. Dites ce que vous pensez.',
  icons: {
    icon: '/branding/logo.png',
    apple: '/branding/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'TOLD',
  },
  verification: {
    google: 'google2c6c5ad20bcf8da6',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-white text-black antialiased">
        <LocaleSync />
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <VercelAnalytics />
      </body>
    </html>
  )
}
