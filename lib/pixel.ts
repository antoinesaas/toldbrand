const PIXEL_ID = '1626291771919365'

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: unknown
  }
}

export function pixelEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', event, params)
}

export function pixelAddToCart(value: number, currency: string, productName: string) {
  pixelEvent('AddToCart', {
    value: value / 100,
    currency,
    content_name: productName,
    content_type: 'product',
  })
}

export function pixelInitiateCheckout(value: number, currency: string, numItems: number) {
  pixelEvent('InitiateCheckout', {
    value: value / 100,
    currency,
    num_items: numItems,
  })
}

export function pixelPurchase(value: number, currency: string, orderId: string) {
  pixelEvent('Purchase', {
    value: value / 100,
    currency,
    content_type: 'product',
    order_id: orderId,
  })
}

export { PIXEL_ID }
