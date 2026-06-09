/** `true` = livraison offerte pour tous (promo temporaire). */
export const PROMO_FREE_SHIPPING_ALL = false

/** Nombre de T-shirts minimum pour la livraison offerte */
export const FREE_SHIPPING_MIN_QUANTITY = 2
export const STANDARD_SHIPPING_CENTS = 495

/** Returns true if total quantity qualifies for free shipping */
export function isCheckoutFreeShipping(totalQuantity: number): boolean {
  if (PROMO_FREE_SHIPPING_ALL) return true
  return totalQuantity >= FREE_SHIPPING_MIN_QUANTITY
}
