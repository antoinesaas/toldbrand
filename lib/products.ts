import type { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id: 'great-taste',
    slug: 'great-taste-terrible-decisions',
    name: 'GREAT TASTE, TERRIBLE DECISIONS',
    phrase: ['GREAT TASTE', 'TERRIBLE', 'DECISIONS'],
    gelatoProductId: 'YOUR_GELATO_PRODUCT_ID',
    price: 2995,
    compareAtPrice: 3995,
    colors: ['white', 'black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: {
      white: ['/images/great-taste-white-back.jpg', '/images/great-taste-white-front.jpg'],
      black: ['/images/great-taste-black-back.jpg'],
    },
    isNew: false,
    isBestseller: true,
    description:
      'Oversized unisex tee. 100% organic cotton, 220 gsm. Printed in Europe by Gelato. Wash at 30°C.',
  },
  {
    id: 'not-avoiding',
    slug: 'not-avoiding-you-avoiding-everyone',
    name: "I'M NOT AVOIDING YOU, I'M AVOIDING EVERYONE",
    phrase: ["I'M NOT", 'AVOIDING YOU', "I'M AVOIDING", 'EVERYONE'],
    gelatoProductId: 'YOUR_GELATO_PRODUCT_ID',
    price: 2995,
    compareAtPrice: 3995,
    colors: ['white', 'black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: {
      white: ['/images/not-avoiding-white-back.jpg'],
      black: ['/images/not-avoiding-black-back.jpg'],
    },
    isNew: true,
    isBestseller: false,
    description:
      'Oversized unisex tee. 100% organic cotton, 220 gsm. Printed in Europe by Gelato. Wash at 30°C.',
  },
  {
    id: 'give-great-advice',
    slug: 'give-great-advice-follow-none',
    name: 'I GIVE GREAT ADVICE, I FOLLOW NONE OF IT',
    phrase: ['I GIVE', 'GREAT ADVICE', 'I FOLLOW', 'NONE OF IT'],
    gelatoProductId: 'YOUR_GELATO_PRODUCT_ID',
    price: 2995,
    compareAtPrice: 3995,
    colors: ['white', 'black'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    images: {
      white: ['/images/great-advice-white-back.jpg'],
      black: ['/images/great-advice-black-back.jpg'],
    },
    isNew: true,
    isBestseller: false,
    description:
      'Oversized unisex tee. 100% organic cotton, 220 gsm. Printed in Europe by Gelato. Wash at 30°C.',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}
