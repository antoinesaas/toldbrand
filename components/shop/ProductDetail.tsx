'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { Product, ProductSize } from '@/types'
import { PRODUCTS } from '@/lib/products'
import { useCartStore, makeItemId } from '@/lib/cart-store'
import { useLocaleStore } from '@/lib/locale-store'
import { useFormatPrice } from '@/lib/use-format-price'
import ProductCard from './ProductCard'
import SizeGuide from './SizeGuide'
import PaymentIcons from './PaymentIcons'

interface Props {
  product: Product
}

type GalleryImage = { src: string; label: string }

export default function ProductDetail({ product }: Props) {
  const [variant, setVariant] = useState(product.variants[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<'description' | 'shipping' | 'size'>('description')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const { addItem, openCart, items } = useCartStore()
  const { currency, country } = useLocaleStore()
  const formatPrice = useFormatPrice()

  const gallery: GalleryImage[] = useMemo(() => {
    const imgs: GalleryImage[] = [
      { src: variant.back, label: 'Dos' },
      { src: variant.front, label: 'Face' },
      { src: variant.lifestyle, label: 'Porté' },
    ]
    if (product.id === 'just-kiss-me') {
      imgs.push({ src: '/images/lifestyle/just-kiss-me-boat.jpg', label: 'Lifestyle' })
      imgs.push({ src: '/images/lifestyle/just-kiss-me-couple.jpg', label: 'Lifestyle' })
    }
    return imgs
  }, [variant, product.id])

  const active = gallery[activeIndex] ?? gallery[0]
  const related = PRODUCTS.filter((p) => p.id !== product.id)

  function selectVariant(v: typeof variant) {
    setVariant(v)
    setActiveIndex(0)
  }

  async function checkoutWithItems(checkoutItems: typeof items) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: checkoutItems, currency, country }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
      return
    }
    alert(data.error ?? 'Le paiement est temporairement indisponible.')
  }

  async function handleAddToCart() {
    if (!selectedSize) return

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
    if (!selectedSize) return
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

  const titleLine1 = product.phrase[0]
  const titleRest = product.phrase.slice(1).join(' ')

  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-0 lg:gap-12">
          {/* Gallery — Dior vertical scroll */}
          <div className="lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto lg:scrollbar-thin">
            <div className="hidden lg:block space-y-1">
              {gallery.map((img, i) => (
                <div key={img.src} className="relative aspect-[4/5] bg-[#f7f7f7]">
                  <Image
                    src={img.src}
                    alt={`${product.name} — ${img.label}`}
                    fill
                    priority={i === 0}
                    className={i === 0 || i === 1 ? 'object-contain p-6' : 'object-cover object-center'}
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>

            {/* Mobile: main + thumbnails */}
            <div className="lg:hidden px-4 pt-4">
              <div className="relative aspect-square bg-[#f7f7f7] mb-3">
                <Image
                  src={active.src}
                  alt={active.label}
                  fill
                  priority
                  className={
                    activeIndex <= 1 ? 'object-contain p-4' : 'object-cover object-center'
                  }
                  sizes="100vw"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {gallery.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`relative flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-colors ${
                      i === activeIndex ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <Image src={img.src} alt={img.label} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase panel */}
          <div className="lg:sticky lg:top-[88px] lg:self-start px-4 md:px-8 lg:px-0 py-8 lg:py-12 lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto">
            <div className="text-center lg:text-left mb-6">
              <h1 className="text-xl md:text-2xl font-normal uppercase tracking-[0.08em] leading-snug">
                {titleLine1}
              </h1>
              {titleRest && (
                <p className="text-sm text-neutral-500 mt-2 uppercase tracking-wider">{titleRest}</p>
              )}
              <p className="text-xs text-neutral-400 mt-2">{product.tagline}</p>
            </div>

            <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-8">
              <span className="text-base font-medium">{formatPrice(product.price)}</span>
              {product.compareAtPrice > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3 text-center lg:text-left">
                  Autres coloris
                </p>
                <div className="flex justify-center lg:justify-start gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.color}
                      type="button"
                      onClick={() => selectVariant(v)}
                      className={`relative w-14 h-16 border overflow-hidden ${
                        variant.color === v.color ? 'border-black' : 'border-neutral-200'
                      }`}
                    >
                      <Image src={v.back} alt={v.label} fill className="object-contain p-1" sizes="56px" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3 text-center lg:text-left">
                Taille
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] h-11 text-sm border transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="block w-full text-center lg:text-left text-xs underline text-neutral-500 mt-3"
              >
                Guide des tailles
              </button>
            </div>

            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="inline-flex items-center border border-neutral-300">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 hover:bg-neutral-50"
                  aria-label="Moins"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 hover:bg-neutral-50"
                  aria-label="Plus"
                >
                  +
                </button>
              </div>
            </div>

            <PaymentIcons className="mb-4" />

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full h-12 bg-neutral-900 text-white text-sm flex items-center justify-between px-5 hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span className="uppercase tracking-[0.12em]">
                  {added ? 'Ajouté' : 'Ajouter au panier'}
                </span>
                <span className="font-medium">{formatPrice(product.price * quantity)}</span>
              </button>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={!selectedSize || checkoutLoading}
                className="w-full h-11 border border-neutral-900 text-sm uppercase tracking-[0.12em] hover:bg-neutral-50 disabled:opacity-40"
              >
                {checkoutLoading ? 'Redirection…' : 'Payer maintenant'}
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 text-center lg:text-left mt-4 leading-relaxed">
              Livraison offerte dès 60 €. Expédition sous 24–48 h. Retours sous 30 jours.
            </p>

            <div className="mt-8 border-t border-neutral-200">
              <div className="flex border-b border-neutral-200">
                {(
                  [
                    ['description', 'Description'],
                    ['shipping', 'Livraison'],
                    ['size', 'Taille'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={`flex-1 py-3 text-[10px] uppercase tracking-widest ${
                      tab === key ? 'border-b-2 border-black font-semibold' : 'text-neutral-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="py-4 text-sm text-neutral-600 leading-relaxed">
                {tab === 'description' && (
                  <>
                    <p className="mb-3">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.material.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </>
                )}
                {tab === 'shipping' && (
                  <p>
                    Livraison directe à domicile. Délais habituels : 3 à 7 jours ouvrés selon la destination.
                    Livraison offerte pour toute commande de 60 € et plus.
                  </p>
                )}
                {tab === 'size' && (
                  <p>
                    Coupe relax unisexe. Consultez le guide des tailles pour les mesures détaillées.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-20 border-t border-neutral-100 mt-12">
          <h2 className="text-center text-sm font-medium uppercase tracking-[0.2em] mb-12">
            Vous aimerez aussi
          </h2>
          <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {sizeGuideOpen && <SizeGuide onClose={() => setSizeGuideOpen(false)} />}
    </div>
  )
}
