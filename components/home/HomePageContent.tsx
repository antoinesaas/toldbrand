'use client'

import { PRODUCTS } from '@/lib/products'
import ProductDetail from '@/components/shop/ProductDetail'
import { useI18n } from '@/lib/i18n/use-i18n'

export default function HomePageContent() {
  const { t } = useI18n()
  const product = PRODUCTS[0]

  if (!product) return null

  return (
    <>
      <ProductDetail product={product} />

      <section className="py-20 md:py-28 px-6 md:px-16 bg-neutral-50">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="text-[10px] tracking-[0.35em] uppercase text-neutral-400 mb-4">{t.home.brandStoryLabel}</p>
          <h2 className="font-serif text-2xl md:text-3xl font-normal uppercase tracking-[0.08em] leading-snug">
            {t.home.brandStoryTitle}
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-600 leading-relaxed">{t.home.brandStoryBody}</p>
          <p className="mt-4 text-xs tracking-[0.25em] uppercase text-neutral-400">{t.home.brandStoryMilan}</p>
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
