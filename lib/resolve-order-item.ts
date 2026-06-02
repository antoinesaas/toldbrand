import { GELATO_CATALOG } from '@/lib/gelato-catalog'
import { PRODUCTS } from '@/lib/products'
import type { CartItem } from '@/types'

const DEFAULT_GELATO_UID =
  process.env.GELATO_DEFAULT_PRODUCT_UID?.trim() || GELATO_CATALOG.CLASSIC_TEE_WHITE

export function baseUrl() {
  return (process.env.NEXT_PUBLIC_URL ?? 'https://toldbrand.fr').replace(/\s/g, '')
}

export function resolveOrderItem(item: CartItem) {
  const product = PRODUCTS.find((p) => p.id === item.productId)
  const variant = product?.variants.find((v) => v.color === item.color)
  const url = baseUrl()

  const front = variant?.front ?? item.imageUrl
  const back = variant?.back ?? item.imageUrl

  const rawUid = variant?.gelatoProductUid || item.gelatoProductUid || DEFAULT_GELATO_UID
  const productUid = rawUid.replace(/\r/g, '').trim()

  return {
    productUid,
    printFiles: [
      { type: 'default' as const, url: `${url}${front}` },
      { type: 'back' as const, url: `${url}${back}` },
    ],
    productName: product?.name ?? item.name,
    variantLabel: variant?.label ?? item.colorLabel,
  }
}
