import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-ink-light mb-6">404</p>
        <h1 className="font-serif text-5xl text-ink mb-4">Not found.</h1>
        <p className="font-sans text-sm text-ink-light mb-10">
          That page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="font-sans text-xs tracking-[0.2em] uppercase border border-ink px-8 py-3 hover:bg-ink hover:text-cream transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
