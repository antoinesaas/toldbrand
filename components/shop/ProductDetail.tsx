'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { Product, ProductSize } from '@/types'
import { PRODUCTS } from '@/lib/products'
import { useCartStore, makeItemId } from '@/lib/cart-store'
import { useI18n } from '@/lib/i18n/use-i18n'
import { useFormatPrice } from '@/lib/use-format-price'
import ProductCard from './ProductCard'
import SizeGuide from './SizeGuide'
import PaymentIcons from './PaymentIcons'
import StockUrgency from '@/components/ui/StockUrgency'
import SocialProof from '@/components/ui/SocialProof'
import StickyMobileCTA from '@/components/ui/StickyMobileCTA'
import { pixelAddToCart, pixelInitiateCheckout } from '@/lib/pixel'

interface Props {
  product: Product
}

type GalleryImage = { src: string; label: string }

export default function ProductDetail({ product }: Props) {
  const [variant, setVariant] = useState(product.variants[0])
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes.includes('M') ? 'M' : product.sizes[0] ?? null
  )
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<'description' | 'shipping' | 'size'>('description')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const { addItem, openCart, items } = useCartStore()
  const { t, currency, country, language } = useI18n()
  const formatPrice = useFormatPrice()

  const gallery: GalleryImage[] = useMemo(() => {
    const hasLifestyle = variant.lifestyle !== variant.front
    const imgs: GalleryImage[] = [
      { src: variant.lifestyle, label: hasLifestyle ? 'Porté' : 'Mockup' },
    ]
    if (hasLifestyle && variant.front) {
      imgs.push({ src: variant.front, label: 'Mockup' })
    }
    return imgs
  }, [variant.front, variant.lifestyle])

  const related = PRODUCTS.filter((p) => p.id !== product.id)

  function selectVariant(v: typeof variant) {
    setVariant(v)
  }

  async function checkoutWithItems(checkoutItems: typeof items) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: checkoutItems, currency, country, language }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
      return
    }
    alert(data.error ?? 'Le paiement est temporairement indisponible.')
  }

  async function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); return }

    setSizeError(false)
    pixelAddToCart(product.price, 'EUR', product.name)
    addItem({
      id: makeItemId(product.id, variant.color, selectedSize),
      productId: product.id,
      name: product.name,
      size: selectedSize,
      color: variant.color,
      colorLabel: variant.label,
      price: product.price,
      imageUrl: variant.back,
      gelatoProductUid: variant.gelatoProductUid,
    })

    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  async function handleCheckout() {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    pixelInitiateCheckout(product.price * quantity, 'EUR', quantity)
    setCheckoutLoading(true)

    const cartItem = {
      id: makeItemId(product.id, variant.color, selectedSize),
      productId: product.id,
      name: product.name,
      size: selectedSize,
      color: variant.color,
      colorLabel: variant.label,
      price: product.price,
      quantity,
      imageUrl: variant.back,
      gelatoProductUid: variant.gelatoProductUid,
    }

    const existing = items.find((i) => i.id === cartItem.id)
    const checkoutItems = existing
      ? items.map((i) => (i.id === cartItem.id ? { ...i, quantity: i.quantity + quantity } : i))
      : [...items, cartItem]

    try {
      await checkoutWithItems(checkoutItems)
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="pt-[88px] min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-0 lg:gap-12">
          {/* Gallery — vertical scroll (studio shots only, no watermarks) */}
          <div className="lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto lg:scrollbar-thin">
            <div className="hidden lg:block space-y-3 px-0 lg:pr-4">
              {gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/5] bg-[#141414] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={img.src}
                    alt={`${product.name} — ${img.label}`}
                    fill
                    className={
                      img.label === 'Porté'
                        ? 'object-cover object-center'
                        : 'object-contain p-8'
                    }
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>

            <div className="lg:hidden px-4 pt-4 space-y-3">
              {gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/5] bg-[#141414] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={img.src}
                    alt={`${product.name} — ${img.label}`}
                    fill
                    className={
                      img.label === 'Porté'
                        ? 'object-cover object-center'
                        : 'object-contain p-6'
                    }
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Purchase panel */}
          <div className="lg:sticky lg:top-[88px] lg:self-start px-4 md:px-8 lg:px-0 py-8 lg:py-12 lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto">
            <div className="text-center mb-6">
              <h1 className="text-lg md:text-xl font-bold uppercase tracking-[0.1em] leading-snug text-white">
                {product.name}
              </h1>
              <p className="text-xs text-white/40 mt-3">{product.tagline}</p>
            </div>

            <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-8">
              <span className="text-base font-medium text-white">{formatPrice(product.price)}</span>
              {product.compareAtPrice > product.price && (
                <span className="text-sm text-white/30 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {product.variants.length > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                    Coloris
                  </p>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/70">
                    — {variant.label}
                  </span>
                </div>
                <div className="flex justify-center lg:justify-start gap-3 py-1">
                  {product.variants.map((v) => (
                    <button
                      key={v.color}
                      type="button"
                      onClick={() => selectVariant(v)}
                      title={v.label}
                      className={`w-8 h-8 rounded-full transition-all flex-shrink-0 ${
                        variant.color === v.color
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]'
                          : 'ring-1 ring-white/30 hover:ring-white/50'
                      } ${v.color === 'black' ? 'bg-[#2a2a2a]' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3 text-center lg:text-left">
                {t.product.size}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] h-11 text-sm border rounded-full transition-all ${
                      selectedSize === size
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-white/20 text-white hover:border-white/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="block w-full text-center lg:text-left text-xs underline text-white/30 mt-3 hover:text-white/60"
              >
                {t.product.sizeGuide}
              </button>
              {sizeError && (
                <p className="text-red-400 text-xs text-center lg:text-left mt-2 animate-pulse">
                  Veuillez choisir une taille
                </p>
              )}
            </div>

            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="inline-flex items-center border border-white/20 rounded-full overflow-hidden text-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 hover:bg-white/10"
                  aria-label="Moins"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 hover:bg-white/10"
                  aria-label="Plus"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full h-12 bg-white text-black text-sm flex items-center justify-between px-5 hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-full font-bold"
              >
                <span className="uppercase tracking-[0.12em]">
                  {added ? t.product.added : t.product.addToCart}
                </span>
                <span className="font-medium">{formatPrice(product.price * quantity)}</span>
              </button>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={!selectedSize || checkoutLoading}
                className="w-full h-11 border border-white/30 text-white text-sm uppercase tracking-[0.12em] hover:border-white/60 disabled:opacity-30 rounded-full"
              >
                {checkoutLoading ? t.product.redirecting : t.product.payNow}
              </button>
            </div>

            <PaymentIcons className="mt-4" />
            <StockUrgency productId={product.id} />
            <SocialProof />

            <p className="text-[11px] text-white/30 text-center lg:text-left mt-4 leading-relaxed">
              {t.product.shippingNote}
            </p>

            <div className="mt-8 border-t border-white/10">
              <div className="flex border-b border-white/10">
                {(
                  [
                    ['description', t.product.description],
                    ['shipping', t.product.shipping],
                    ['size', t.product.sizeTab],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={`flex-1 py-3 text-[10px] uppercase tracking-widest ${
                      tab === key ? 'border-b-2 border-white text-white font-semibold' : 'text-white/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="py-4 text-sm text-white/60 leading-relaxed space-y-3">
                {tab === 'description' && (
                  <>
                    <p>{product.description}</p>
                    {product.descriptionExtra && <p>{product.descriptionExtra}</p>}
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <ul className="list-disc pl-4 space-y-1 text-white/30">
                      {product.material.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </>
                )}
                {tab === 'shipping' && <p>{t.product.shippingText}</p>}
                {tab === 'size' && <p>{t.product.sizeText}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 border-t border-white/10 mt-8">
          <h2 className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-8">
            {t.product.related}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
            {related.slice(0, 5).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {sizeGuideOpen && <SizeGuide onClose={() => setSizeGuideOpen(false)} />}
      <StickyMobileCTA
        onAddToCart={handleAddToCart}
        onBuyNow={handleCheckout}
        disabled={!selectedSize}
        loading={checkoutLoading}
      />
    </div>
  )
}
