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
  const image = product.variants[0]?.back
  return {
    title: product.name,
    description: product.description,
    openGraph: image ? { images: [{ url: image, width: 1200, height: 1200 }] } : {},
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
