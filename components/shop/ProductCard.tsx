import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/products'
import Badge from '@/components/ui/Badge'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const primaryImage = product.images.white?.[0] ?? product.images.black?.[0]

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image container — no rounded corners, editorial square */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark mb-4">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder: show the product phrase */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-dark p-8">
            {product.phrase.map((line, i) => (
              <span
                key={i}
                className="font-sans text-xs tracking-[0.3em] uppercase text-ink-light text-center leading-loose"
              >
                {line}
              </span>
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestseller && <Badge variant="bestseller" />}
          {product.isNew && <Badge variant="new" />}
        </div>

        {/* Compare price overlay */}
        {product.compareAtPrice > product.price && (
          <div className="absolute bottom-3 right-3">
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase bg-red-accent text-white px-2 py-1">
              Sale
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="border-b border-gold/20 pb-4">
        <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink mb-1 leading-relaxed">
          {product.name}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-serif text-base text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice > product.price && (
            <span className="font-sans text-xs text-ink-light line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {/* Color swatches */}
        <div className="flex gap-2 mt-2">
          {product.colors.map((color) => (
            <span
              key={color}
              className="w-3 h-3 border border-gold/30"
              style={{ backgroundColor: color === 'white' ? '#FFFFFF' : '#1A1A18' }}
              title={color}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
