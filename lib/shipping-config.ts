/** `true` = livraison offerte pour tous (promo temporaire). */
export const PROMO_FREE_SHIPPING_ALL = false

export const FREE_SHIPPING_THRESHOLD_CENTS = 6000
export const STANDARD_SHIPPING_CENTS = 495

export function isCheckoutFreeShipping(subtotalCents: number): boolean {
  if (PROMO_FREE_SHIPPING_ALL) return true
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
}
