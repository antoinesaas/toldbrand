'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product, ProductSize } from '@/types'
import { PRODUCTS, formatPrice } from '@/lib/products'
import { useCartStore, makeItemId } from '@/lib/cart-store'
import ProductCard from './ProductCard'
import SizeGuide from './SizeGuide'

interface Props {
  product: Product
}

const TRUST_ITEMS = [
  { icon: '✓', text: 'BUY NOW — ', highlight: 'ORDERS SHIPPED WITHIN 24–48 HOURS' },
  { icon: '✈', text: 'WORLDWIDE SHIPPING' },
  { icon: '↩', text: 'EASY RETURNS' },
  { icon: '★', text: 'HIGH QUALITY' },
]

export default function ProductDetail({ product }: Props) {
  const [variant, setVariant] = useState(product.variants[0])
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [shippingOpen, setShippingOpen] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const { addItem, openCart, items } = useCartStore()

  const related = PRODUCTS.filter((p) => p.id !== product.id)

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

  async function handleBuyNow() {
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
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: checkoutItems }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Gallery — TalkLess dual + lifestyle */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                <Image
                  src={variant.back}
                  alt={`${product.name} — back`}
                  fill
                  priority
                  className="object-contain object-center p-4"
                  sizes="(max-width: 640px) 100vw, 35vw"
                />
              </div>
              <div className="relative aspect-square bg-neutral-50 overflow-hidden">
                <Image
                  src={variant.lifestyle}
                  alt={`${product.name} — lifestyle`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 35vw"
                />
              </div>
            </div>

            {/* Front thumbnail strip */}
            <div className="flex gap-2">
              {[variant.back, variant.front, variant.lifestyle].map((src, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 border border-neutral-200 overflow-hidden bg-neutral-50"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <ul className="space-y-3 pt-4 border-t border-neutral-100">
              {TRUST_ITEMS.map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-xs font-medium tracking-wide">
                  <span className="text-neutral-400 w-4">{item.icon}</span>
                  <span>
                    {item.text}
                    {item.highlight && (
                      <span className="text-emerald-600">{item.highlight}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Purchase panel */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-black leading-tight">
                {product.phrase[0]}
                {product.phrase.length > 1 && (
                  <>
                    <br />
                    <span className="text-lg md:text-xl font-semibold text-neutral-600">
                      {product.phrase.slice(1).join(' ')}
                    </span>
                  </>
                )}
              </h1>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
                {product.compareAtPrice > product.price && (
                  <span className="text-neutral-400 line-through text-sm">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color / variant */}
            {product.variants.length > 1 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  Print color — <span className="text-black">{variant.label}</span>
                </p>
                <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.color}
                      onClick={() => setVariant(v)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        variant.color === v.color ? 'border-black scale-110' : 'border-neutral-200'
                      }`}
                      style={{ backgroundColor: v.hex }}
                      title={v.label}
                      aria-label={v.label}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 px-3 text-sm font-medium border transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-neutral-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-neutral-400 mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-neutral-300">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 text-lg hover:bg-neutral-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 text-lg hover:bg-neutral-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full h-12 bg-black text-white text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6h15l-1.5 9h-12z" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
                {added ? 'Added to cart ✓' : 'Add to cart'}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!selectedSize || checkoutLoading}
                className="w-full h-12 bg-[#5A31F4] text-white text-sm font-semibold hover:bg-[#4a28d4] disabled:opacity-40 transition-colors"
              >
                {checkoutLoading ? 'Redirecting…' : 'Buy now — Stripe Checkout'}
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-neutral-200 pt-2 space-y-0">
              <div className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full flex justify-between items-center py-4 text-xs font-bold uppercase tracking-widest"
                >
                  Details
                  <span>{detailsOpen ? '−' : '+'}</span>
                </button>
                {detailsOpen && (
                  <div className="pb-4 text-sm text-neutral-600 space-y-3">
                    {product.details.map((d) => (
                      <p key={d}>{d}</p>
                    ))}
                    <p className="font-semibold text-black text-xs uppercase tracking-wider">
                      Material &amp; Quality
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.material.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShippingOpen(!shippingOpen)}
                  className="w-full flex justify-between items-center py-4 text-xs font-bold uppercase tracking-widest"
                >
                  <span>🚚 Shipping</span>
                  <span>{shippingOpen ? '−' : '+'}</span>
                </button>
                {shippingOpen && (
                  <p className="pb-4 text-sm text-neutral-600">
                    Printed on demand in Europe via Gelato. Standard delivery 3–7 business days.
                    Orders ship within 24–48 hours after payment.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="w-full flex justify-between items-center py-4 text-xs font-bold uppercase tracking-widest"
              >
                <span>👕 Size guide</span>
                <span>+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 border-t border-neutral-100">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
