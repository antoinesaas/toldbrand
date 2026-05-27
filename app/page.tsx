import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'

export default function HomePage() {
  return (
    <>
      {/* Video hero */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/products/eat-french/black/lifestyle.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-16 left-6 md:left-16 text-white max-w-xl z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">New collection</p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase leading-[0.95] mb-6 tracking-tight">
            Say what
            <br />
            you mean.
          </h1>
          <Link
            href="/shop"
            className="inline-block text-xs tracking-[0.2em] uppercase border border-white/80 px-8 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Shop the collection
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-black py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.3em] uppercase text-white/50 mx-8 flex-shrink-0"
            >
              Premium Statement Tees · Printed in Europe · Organic Cotton ·
            </span>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <div className="flex items-baseline justify-between mb-12 max-w-[1400px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">The Collection</h2>
          <Link
            href="/shop"
            className="text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="relative py-32 px-6 md:px-16 bg-neutral-950 text-white">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-8">The idea</p>
        <blockquote className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.05] max-w-4xl tracking-tight">
          &ldquo;Clothes that say what you were too polite to.&rdquo;
        </blockquote>
        <p className="mt-12 text-xs tracking-[0.3em] uppercase text-white/40">TOLD—</p>
      </section>

      {/* Shipping */}
      <section className="border-t border-neutral-100 py-16 px-6 md:px-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-[1000px] mx-auto">
          {[
            { label: 'Free Returns', sub: 'Within 30 days' },
            { label: 'Printed in Europe', sub: 'Via Gelato network' },
            { label: 'Ships in 3–7 days', sub: 'Standard shipping' },
          ].map(({ label, sub }) => (
            <div key={label}>
              <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-1">{label}</p>
              <p className="text-xs text-neutral-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
