import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'

const LIFESTYLE = [
  { src: '/images/lifestyle/eat-french-black.jpg', alt: 'Eat French — lifestyle' },
  { src: '/images/lifestyle/eat-french-pink.jpg', alt: 'Eat French pink' },
  { src: '/images/lifestyle/eat-french-blue.jpg', alt: 'Eat French blue' },
  { src: '/images/lifestyle/just-kiss-me-boat.jpg', alt: 'Just Kiss Me — bateau' },
  { src: '/images/lifestyle/just-kiss-me-couple.jpg', alt: 'Just Kiss Me — couple' },
  { src: '/images/products/just-kiss-me/lifestyle.jpg', alt: 'Just Kiss Me — urbain' },
]

export default function HomePage() {
  return (
    <>
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/lifestyle/eat-french-black.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-6">Nouvelle collection</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.12em] leading-tight max-w-4xl">
            Say what
            <br />
            you mean.
          </h1>
          <Link
            href="/shop"
            className="mt-10 inline-block text-[10px] tracking-[0.25em] uppercase border border-white/80 px-10 py-3 hover:bg-white hover:text-black transition-colors"
          >
            Découvrir la collection
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <h2 className="text-center text-sm font-medium uppercase tracking-[0.25em] mb-12 md:mb-16">
          En situation
        </h2>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {LIFESTYLE.map((img) => (
            <div key={img.src} className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-white border-t border-neutral-100">
        <div className="max-w-[1200px] mx-auto text-center mb-12">
          <h2 className="text-sm font-medium uppercase tracking-[0.25em]">La collection</h2>
          <Link
            href="/shop"
            className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black"
          >
            Tout voir
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-[800px] mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 text-white text-center">
        <blockquote className="text-2xl md:text-4xl font-normal uppercase tracking-[0.08em] leading-snug max-w-3xl mx-auto">
          &ldquo;Des vêtements qui disent ce que vous étiez trop poli pour dire.&rdquo;
        </blockquote>
      </section>

      <section className="py-16 px-6 border-t border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-[900px] mx-auto">
          {[
            { label: 'Retours faciles', sub: 'Sous 30 jours' },
            { label: 'Livraison offerte', sub: 'Dès 60 €' },
            { label: 'Expédition rapide', sub: '24–48 h' },
          ].map(({ label, sub }) => (
            <div key={label}>
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{label}</p>
              <p className="text-xs text-neutral-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
