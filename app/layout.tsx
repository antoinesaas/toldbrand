import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'TOLD— Statement Clothing',
    template: '%s | TOLD—',
  },
  description:
    'Premium statement tees. Unisex, oversized, printed in Europe. Say what you mean.',
  keywords: ['statement tshirt', 'oversized tee', 'told brand', 'eat french'],
  openGraph: {
    type: 'website',
    locale: 'en_EU',
    siteName: 'TOLD—',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-black antialiased">
        <AnnouncementBar />
        <Nav />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
