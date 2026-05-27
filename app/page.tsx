import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS, formatPrice } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.isBestseller || p.isNew).slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Told— statement clothing"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Bottom-left editorial text */}
        <div className="absolute bottom-12 left-8 md:left-16 text-white max-w-lg">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
            New collection
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">
            Say what
            <br />
            you mean.
          </h1>
          <Link
            href="/shop"
            className="inline-block font-sans text-xs tracking-[0.2em] uppercase border border-white/70 px-8 py-3 hover:bg-white hover:text-ink transition-colors duration-300"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      {/* MARQUEE DIVIDER */}
      <div className="overflow-hidden bg-ink py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-sans text-xs tracking-[0.3em] uppercase text-cream/60 mx-8 flex-shrink-0"
            >
              Premium Statement Tees &nbsp;&middot;&nbsp; Printed in Europe &nbsp;&middot;&nbsp; Organic Cotton &nbsp;&middot;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="px-8 md:px-16 py-20">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-ink">The Collection</h2>
          <Link
            href="/shop"
            className="font-sans text-xs tracking-[0.2em] uppercase text-ink-light hover:text-ink transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* EDITORIAL STATEMENT */}
      <section className="relative py-32 px-8 md:px-16 bg-ink text-cream overflow-hidden">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-cream/40 mb-8">
          The idea
        </p>
        <blockquote className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl">
          &ldquo;Clothes that say what you were too polite to.&rdquo;
        </blockquote>
        <div className="mt-16 flex items-center gap-8">
          <div className="h-px flex-1 bg-cream/10" />
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-cream/40">
            Told—
          </span>
          <div className="h-px flex-1 bg-cream/10" />
        </div>
      </section>

      {/* PRODUCT SHOWCASE — second row */}
      {PRODUCTS.length > 3 && (
        <section className="px-8 md:px-16 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {PRODUCTS.slice(3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* SHIPPING STRIP */}
      <section className="border-t border-gold/30 py-16 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { label: 'Free Returns', sub: 'Within 30 days' },
            { label: 'Printed in Europe', sub: 'Via Gelato network' },
            { label: 'Ships in 3–7 days', sub: 'Standard shipping' },
          ].map(({ label, sub }) => (
            <div key={label}>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-ink mb-1">{label}</p>
              <p className="font-sans text-xs text-ink-light">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
