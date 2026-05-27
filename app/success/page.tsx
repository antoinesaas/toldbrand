import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order confirmed',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink-light mb-6">
          Order confirmed
        </p>
        <h1 className="font-serif text-5xl text-ink mb-4">Thank you.</h1>
        <p className="font-sans text-sm text-ink-light mb-10 leading-relaxed">
          Your order is on its way. You&apos;ll receive a confirmation email shortly, and
          your tee will be printed and shipped within 3–7 business days.
        </p>
        <Link
          href="/shop"
          className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-ink px-8 py-3 hover:bg-ink hover:text-cream transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
