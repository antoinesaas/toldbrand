import { PRODUCTS } from '@/lib/products'
import type { CartItem } from '@/types'

const DEFAULT_GELATO_UID =
  process.env.GELATO_DEFAULT_PRODUCT_UID ||
  'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_m_gco_white_gpr_4-4'

export function baseUrl() {
  return (process.env.NEXT_PUBLIC_URL ?? 'https://toldbrand.fr').replace(/\s/g, '')
}

export function resolveOrderItem(item: CartItem) {
  const product = PRODUCTS.find((p) => p.id === item.productId)
  const variant = product?.variants.find((v) => v.color === item.color)
  const url = baseUrl()

  const front = variant?.front ?? item.imageUrl
  const back = variant?.back ?? item.imageUrl

  return {
    productUid: variant?.gelatoProductUid || item.gelatoProductUid || DEFAULT_GELATO_UID,
    printFiles: [
      { type: 'default' as const, url: `${url}${front}` },
      { type: 'back' as const, url: `${url}${back}` },
    ],
    productName: product?.name ?? item.name,
    variantLabel: variant?.label ?? item.colorLabel,
  }
}
