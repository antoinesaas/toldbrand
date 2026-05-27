import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans bg-white text-black antialiased">
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
