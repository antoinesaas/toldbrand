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
    lifestyle: '/images/products/eat-french/pink/back.jpg',
    gelatoProductUid: gelatoUid('EAT_FRENCH_PINK'),
  },
  {
    color: 'blue',
    label: 'Blue print',
    hex: '#4FC3F7',
    front: '/images/products/eat-french/blue/front.jpg',
    back: '/images/products/eat-french/blue/back.jpg',
    lifestyle: '/images/products/eat-french/blue/back.jpg',
    gelatoProductUid: gelatoUid('EAT_FRENCH_BLUE'),
  },
  {
    color: 'black',
    label: 'Black print',
    hex: '#1A1A18',
    front: '/images/products/eat-french/black/front.jpg',
    back: '/images/products/eat-french/black/back.jpg',
    lifestyle: '/images/products/eat-french/black/back.jpg',
    gelatoProductUid: gelatoUid('EAT_FRENCH_BLACK'),
  },
]

const kissMeVariant: ProductVariant = {
  color: 'white',
  label: 'White / Red print',
  hex: '#FFFFFF',
  front: '/images/products/just-kiss-me/front.jpg',
  back: '/images/products/just-kiss-me/back.jpg',
  lifestyle: '/images/products/just-kiss-me/back.jpg',
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
      'Le t-shirt statement de la maison TOLD. Typographie audacieuse au dos, logo discret face. Une pièce qui assume son humour européen sans compromis sur la qualité.',
    descriptionExtra:
      'Coupe oversize unisexe, tombé relax et épaules légèrement tombantes. 100 % coton peigné, 220 gsm, lavé pour un toucher doux dès la première mise. Coutures renforcées, col rib 1×1. Impression haute définition, résistante aux lavages.',
    details: [
      'Face : logo TOLD brodé / imprimé',
      'Dos : message typographique EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
      '3 coloris : rose, bleu ciel, noir',
    ],
    material: [
      '100 % coton peigné, 220 gsm',
      'Coupe relax unisexe',
      'Lavage doux, toucher premium',
      'Impression haute qualité',
    ],
  },
  {
    id: 'just-kiss-me',
    slug: 'just-kiss-me-we-can-talk-later',
    name: 'JUST KISS ME — WE CAN TALK LATER',
    tagline: 'We can talk later.',
    phrase: ['JUST KISS ME', 'WE CAN TALK LATER'],
    price: 2995,
    compareAtPrice: 3995,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [kissMeVariant],
    isNew: true,
    isBestseller: false,
    description:
      'Un message direct, un peu impertinent, beaucoup de style. Le tee Just Kiss Me est pensé pour ceux qui préfèrent l’action aux longues discussions.',
    descriptionExtra:
      'Blanc éclatant, impression rouge profond au dos. Même exigence TOLD : coton lourd, coupe confortable, finitions soignées. À porter seul avec un jean ou sous une veste structurée.',
    details: [
      'Face : logo TOLD',
      'Dos : JUST KISS ME — WE CAN TALK LATER',
      'Coloris : blanc / imprimé rouge',
    ],
    material: [
      '100 % coton peigné, 220 gsm',
      'Coupe relax unisexe',
      'Lavage doux',
      'Impression haute qualité',
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
