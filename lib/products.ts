import type { Product, ProductVariant } from '@/types'

const gelatoUid = (key: string) =>
  process.env[`GELATO_UID_${key}`] ?? process.env.GELATO_DEFAULT_PRODUCT_UID ?? ''

const eatFrenchVariants: ProductVariant[] = [
  {
    color: 'pink',
    label: 'Pink print',
    hex: '#E91E8C',
    front: '/images/products/eat-french/pink/front.jpg',
    back: '/images/products/eat-french/pink/back.jpg',
    lifestyle: '/images/products/eat-french/pink/lifestyle.jpg',
    gelatoProductUid: gelatoUid('EAT_FRENCH_PINK'),
  },
  {
    color: 'blue',
    label: 'Blue print',
    hex: '#4FC3F7',
    front: '/images/products/eat-french/blue/front.jpg',
    back: '/images/products/eat-french/blue/back.jpg',
    lifestyle: '/images/products/eat-french/blue/lifestyle.jpg',
    gelatoProductUid: gelatoUid('EAT_FRENCH_BLUE'),
  },
  {
    color: 'black',
    label: 'Black print',
    hex: '#1A1A18',
    front: '/images/products/eat-french/black/front.jpg',
    back: '/images/products/eat-french/black/back.jpg',
    lifestyle: '/images/products/eat-french/black/lifestyle.jpg',
    gelatoProductUid: gelatoUid('EAT_FRENCH_BLACK'),
  },
]

const kissMeVariant: ProductVariant = {
  color: 'white',
  label: 'White / Red print',
  hex: '#FFFFFF',
  front: '/images/products/just-kiss-me/front.jpg',
  back: '/images/products/just-kiss-me/back.jpg',
  lifestyle: '/images/products/just-kiss-me/lifestyle.jpg',
  gelatoProductUid: gelatoUid('JUST_KISS_ME'),
}

export const PRODUCTS: Product[] = [
  {
    id: 'eat-french',
    slug: 'eat-french-drive-german-date-italian',
    name: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
    tagline: 'European taste, one tee.',
    phrase: ['EAT', 'FRENCH', 'DRIVE', 'GERMAN', 'DATE', 'ITALIAN'],
    price: 2995,
    compareAtPrice: 3995,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: eatFrenchVariants,
    isNew: false,
    isBestseller: true,
    description:
      'T-shirt oversize unisexe. 100 % coton, lavage doux, 220 gsm. Impression haute qualité.',
    details: ['Front: TOLD logo', 'Back: Bold typographic print'],
    material: [
      '100% cotton',
      'Heavyweight, soft-washed',
      'Relaxed unisex fit with durable stitching',
    ],
  },
  {
    id: 'just-kiss-me',
    slug: 'just-kiss-me-we-can-talk-later',
    name: 'JUST KISS ME',
    tagline: 'We can talk later.',
    phrase: ['JUST KISS ME', 'WE CAN TALK LATER'],
    price: 2995,
    compareAtPrice: 3995,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [kissMeVariant],
    isNew: true,
    isBestseller: false,
    description:
      'T-shirt oversize unisexe. 100 % coton, lavage doux, 220 gsm. Impression haute qualité.',
    details: ['Front: TOLD logo', 'Back: Bold text print'],
    material: [
      '100% cotton',
      'Heavyweight, soft-washed',
      'Relaxed unisex fit with durable stitching',
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getVariant(product: Product, color: string): ProductVariant | undefined {
  return product.variants.find((v) => v.color === color)
}

export function formatPrice(cents: number, locale = 'fr-FR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100)
}
