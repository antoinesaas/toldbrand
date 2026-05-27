import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import CartDrawer from '@/components/cart/CartDrawer'

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

export const metadata: Metadata = {
  title: {
    default: 'Told— Statement Clothing',
    template: '%s | Told—',
  },
  description:
    'Premium statement tees. Unisex, oversized, printed in Europe. Say what you mean.',
  keywords: ['statement tshirt', 'oversized tee', 'printed tshirt', 'told brand'],
  openGraph: {
    type: 'website',
    locale: 'en_EU',
    siteName: 'Told—',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-cream text-ink">
        <AnnouncementBar />
        <Nav />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
