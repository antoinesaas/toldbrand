import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, PRODUCTS } from '@/lib/products'
import ProductDetail from '@/components/shop/ProductDetail'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description ?? `${product.name} — Premium oversized statement tee by Told—`,
    openGraph: {
      images: product.images.white?.[0]
        ? [{ url: product.images.white[0], width: 1200, height: 1500 }]
        : [],
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
