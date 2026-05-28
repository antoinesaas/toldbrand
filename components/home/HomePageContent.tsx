'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'
import { useI18n } from '@/lib/i18n/use-i18n'

const LANDING_SHOTS = [
  {
    productId: 'just-kiss-me',
    src: '/images/landing/just-kiss-me.png',
    subtitleKey: 'kiss' as const,
  },
  {
    productId: 'eat-french',
    src: '/images/landing/eat-french-pink.png',
    subtitleKey: 'pink' as const,
  },
]

const SUBTITLE: Record<string, Record<string, string>> = {
  fr: {
    kiss: 'JUST KISS ME — WE CAN TALK LATER',
    pink: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
  },
  en: {
    kiss: 'JUST KISS ME — WE CAN TALK LATER',
    pink: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
  },
  de: {
    kiss: 'JUST KISS ME — WE CAN TALK LATER',
    pink: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
  },
  it: {
    kiss: 'JUST KISS ME — WE CAN TALK LATER',
    pink: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
  },
  es: {
    kiss: 'JUST KISS ME — WE CAN TALK LATER',
    pink: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
  },
}

export default function HomePageContent() {
  const { t, language } = useI18n()
  const subs = SUBTITLE[language] ?? SUBTITLE.fr

  function productName(id: string) {
    return PRODUCTS.find((p) => p.id === id)?.name ?? id
  }

  return (
    <>
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-black rounded-b-3xl">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/landing/just-kiss-me.png"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-6">{t.hero.newCollection}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal uppercase tracking-[0.12em] leading-tight max-w-4xl">
            Say what
            <br />
            you mean.
          </h1>
          <Link
            href="/shop"
            className="mt-10 inline-block text-[10px] tracking-[0.25em] uppercase border border-white/80 px-10 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <h2 className="text-center text-sm font-medium uppercase tracking-[0.25em] mb-12 md:mb-16">
          {t.home.inSituation}
        </h2>

        <div className="max-w-[1400px] mx-auto space-y-20">
          {LANDING_SHOTS.map((item, idx) => {
            const left = idx % 2 === 0
            const title = productName(item.productId)
            const slug = PRODUCTS.find((p) => p.id === item.productId)?.slug

            return (
              <div key={item.src} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {left && (
                  <div className="order-1 md:order-1">
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-2xl">
                      <Image
                        src={item.src}
                        alt={title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}

                <div className={`order-2 ${left ? 'md:order-2' : 'md:order-1'} text-center md:text-left`}>
                  <h3 className="font-serif text-xl md:text-2xl font-normal uppercase tracking-[0.08em] leading-snug">
                    {title}
                  </h3>
                  <p className="mt-4 text-xs tracking-[0.2em] uppercase text-neutral-500">{subs[item.subtitleKey]}</p>
                  {slug && (
                    <Link
                      href={`/shop/${slug}`}
                      className="inline-block mt-6 text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-black underline-offset-4 hover:underline"
                    >
                      {t.hero.cta}
                    </Link>
                  )}
                </div>

                {!left && (
                  <div className="order-1 md:order-2">
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-2xl">
                      <Image
                        src={item.src}
                        alt={title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-white border-t border-neutral-100">
        <div className="max-w-[1200px] mx-auto text-center mb-12">
          <h2 className="text-sm font-medium uppercase tracking-[0.25em]">{t.home.collection}</h2>
          <Link
            href="/shop"
            className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-black"
          >
            {t.home.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-[800px] mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 text-white text-center rounded-3xl mx-4 md:mx-8">
        <blockquote className="text-2xl md:text-4xl font-normal uppercase tracking-[0.08em] leading-snug max-w-3xl mx-auto">
          &ldquo;{t.home.quote}&rdquo;
        </blockquote>
      </section>

      <section className="py-16 px-6 border-t border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-[900px] mx-auto">
          {[
            { label: t.home.benefitReturns, sub: t.home.benefitReturnsSub },
            { label: t.home.benefitShipping, sub: t.home.benefitShippingSub },
            { label: t.home.benefitFast, sub: t.home.benefitFastSub },
          ].map(({ label, sub }) => (
            <div key={label} className="rounded-2xl border border-neutral-100 py-6 px-4">
              <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{label}</p>
              <p className="text-xs text-neutral-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
