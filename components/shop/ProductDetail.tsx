'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product, ProductColor, ProductSize } from '@/types'
import { formatPrice } from '@/lib/products'
import { useCartStore, makeItemId } from '@/lib/cart-store'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SizeGuide from './SizeGuide'

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCartStore()

  const images = product.images[selectedColor] ?? []
  const currentImage = images[activeImage] ?? null

  function handleAddToCart() {
    if (!selectedSize) return

    addItem({
      id: makeItemId(product.id, selectedColor, selectedSize),
      productId: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      imageUrl: images[0] ?? '',
      gelatoProductId: product.gelatoProductId,
    })

    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image column */}
        <div className="sticky top-24 self-start">
          {/* Main image */}
          <div className="relative aspect-[3/4] bg-cream-dark overflow-hidden">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                {product.phrase.map((line, i) => (
                  <span
                    key={i}
                    className="font-sans text-sm tracking-[0.3em] uppercase text-ink-light text-center leading-loose"
                  >
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-2 px-4 lg:px-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-20 overflow-hidden border ${
                    i === activeImage ? 'border-ink' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="px-8 md:px-16 py-12 lg:py-16 flex flex-col gap-8">
          {/* Badges */}
          <div className="flex gap-2">
            {product.isBestseller && <Badge variant="bestseller" />}
            {product.isNew && <Badge variant="new" />}
          </div>

          {/* Name */}
          <div>
            <h1 className="font-sans text-sm tracking-[0.2em] uppercase text-ink leading-loose">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-3">
              <span className="font-serif text-2xl text-ink">{formatPrice(product.price)}</span>
              {product.compareAtPrice > product.price && (
                <span className="font-sans text-sm text-ink-light line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Color selector */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-light mb-3">
              Color — <span className="text-ink capitalize">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color)
                    setActiveImage(0)
                  }}
                  className={`w-8 h-8 border transition-all ${
                    selectedColor === color
                      ? 'border-ink scale-110'
                      : 'border-gold/40 hover:border-ink'
                  }`}
                  style={{ backgroundColor: color === 'white' ? '#FFFFFF' : '#1A1A18' }}
                  title={color}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-light">
                Size
              </p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-light hover:text-ink transition-colors underline underline-offset-2"
              >
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-10 font-sans text-xs tracking-[0.1em] border transition-all ${
                    selectedSize === size
                      ? 'border-ink bg-ink text-cream'
                      : 'border-gold/40 text-ink hover:border-ink'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="font-sans text-[10px] text-ink-light mt-2">Please select a size</p>
            )}
          </div>

          {/* Add to cart */}
          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            variant="primary"
            fullWidth
          >
            {added ? 'Added to bag ✓' : 'Add to bag'}
          </Button>

          {/* Description */}
          {product.description && (
            <div className="border-t border-gold/20 pt-6">
              <p className="font-sans text-xs text-ink-light leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {sizeGuideOpen && <SizeGuide onClose={() => setSizeGuideOpen(false)} />}
    </div>
  )
}
