import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="pt-32 min-h-screen bg-white px-6 text-center">
      <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Thank you</h1>
      <p className="text-neutral-600 max-w-md mx-auto mb-8">
        Your order is confirmed. We&apos;ll send it to print via Gelato and email you tracking
        details soon.
      </p>
      <Link
        href="/shop"
        className="inline-block text-xs tracking-[0.2em] uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  )
}
