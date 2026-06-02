import type { ProductSize } from '@/types'

const SIZE_CODE: Record<ProductSize, string> = {
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
  '2XL': '2xl',
}

/** Remplace gsi_m (ou autre) par la taille commandée dans l'UID Gelato. */
export function gelatoUidForSize(productUid: string, size: ProductSize | string): string {
  const code = SIZE_CODE[size as ProductSize] ?? 'm'
  if (/_gsi_[a-z0-9]+_/i.test(productUid)) {
    return productUid.replace(/_gsi_[a-z0-9]+_/i, `_gsi_${code}_`)
  }
  return productUid
}
