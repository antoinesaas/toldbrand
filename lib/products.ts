import type { Product, ProductVariant } from '@/types'
import { GELATO_CATALOG, gelatoUidFromEnv } from '@/lib/gelato-catalog'

const gelatoUid = (key: string, fallback: string) => gelatoUidFromEnv(key, fallback)

const eatFrenchVariants: ProductVariant[] = [
  {
    color: 'pink',
    label: 'Pink print',
    hex: '#E91E8C',
    front: '/images/products/eat-french/pink/front.png',
    back: '/images/products/eat-french/pink/back.png',
    lifestyle: '/images/products/eat-french/pink/lifestyle.png',
    gelatoProductUid: gelatoUid('EAT_FRENCH_PINK', GELATO_CATALOG.CLASSIC_TEE_WHITE),
  },
  {
    color: 'blue',
    label: 'Blue print',
    hex: '#4FC3F7',
    front: '/images/products/eat-french/blue/front.png',
    back: '/images/products/eat-french/blue/back.png',
    lifestyle: '/images/products/eat-french/blue/lifestyle.png',
    gelatoProductUid: gelatoUid('EAT_FRENCH_BLUE', GELATO_CATALOG.CLASSIC_TEE_ROYAL_BLUE),
  },
  {
    color: 'black',
    label: 'Black print',
    hex: '#1A1A18',
    front: '/images/products/eat-french/black/front.png',
    back: '/images/products/eat-french/black/back.png',
    lifestyle: '/images/products/eat-french/black/lifestyle.png',
    gelatoProductUid: gelatoUid('EAT_FRENCH_BLACK', GELATO_CATALOG.CLASSIC_TEE_BLACK),
  },
]

const cryBetterLamborghiniVariant: ProductVariant = {
  color: 'white',
  label: 'Blanc / Jaune',
  hex: '#FFFFFF',
  front: '/images/products/cry-better-lamborghini/white/front.png',
  back: '/images/products/cry-better-lamborghini/white/back.png',
  lifestyle: '/images/products/cry-better-lamborghini/white/lifestyle.png',
  gelatoProductUid: gelatoUid('CRY_BETTER_LAMBORGHINI', GELATO_CATALOG.CLASSIC_TEE_WHITE),
}

const jobUnemployedVariants: ProductVariant[] = [
  {
    color: 'white',
    label: 'Blanc / Noir',
    hex: '#F5F5F0',
    front: '/images/products/job-unemployed/white/front.png',
    back: '/images/products/job-unemployed/white/back.png',
    lifestyle: '/images/products/job-unemployed/white/lifestyle.png',
    gelatoProductUid: gelatoUid('JOB_UNEMPLOYED_WHITE', GELATO_CATALOG.CLASSIC_TEE_WHITE),
  },
  {
    color: 'blue',
    label: 'Bleu / Blanc',
    hex: '#1E5FAD',
    front: '/images/products/job-unemployed/blue/front.png',
    back: '/images/products/job-unemployed/blue/back.png',
    lifestyle: '/images/products/job-unemployed/blue/lifestyle.png',
    gelatoProductUid: gelatoUid('JOB_UNEMPLOYED_BLUE', GELATO_CATALOG.CLASSIC_TEE_ROYAL_BLUE),
  },
  {
    color: 'red',
    label: 'Rouge / Blanc',
    hex: '#C41E3A',
    front: '/images/products/job-unemployed/red/front.png',
    back: '/images/products/job-unemployed/red/back.png',
    lifestyle: '/images/products/job-unemployed/red/lifestyle.png',
    gelatoProductUid: gelatoUid('JOB_UNEMPLOYED_RED', GELATO_CATALOG.CLASSIC_TEE_RED),
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'eat-french',
    slug: 'eat-french-drive-german-date-italian',
    name: 'EAT FRENCH · DRIVE GERMAN · DATE ITALIAN',
    tagline: 'European taste, one tee.',
    phrase: ['EAT', 'FRENCH', 'DRIVE', 'GERMAN', 'DATE', 'ITALIAN'],
    price: 3995,
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
    id: 'cry-better-lamborghini',
    slug: 'we-cry-better-in-lamborghini',
    name: 'WE CRY BETTER IN LAMBORGHINI',
    tagline: 'Luxury tears only.',
    phrase: ['WE CRY BETTER', 'IN LAMBORGHINI'],
    price: 2995,
    compareAtPrice: 3995,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [cryBetterLamborghiniVariant],
    isNew: true,
    isBestseller: false,
    description:
      'Ironie italienne, typo jaune marker et Countach au dos. Un tee statement pour ceux qui assument l’excès — même les larmes voyagent en supercar.',
    descriptionExtra:
      'Face sobre TOLD · EST. 2023, dos « WE CRY BETTER IN LAMBORGHINI » avec illustration Lamborghini. Coton peigné 220 gsm, coupe relax unisexe, finitions TOLD.',
    details: [
      'Face : TOLD · EST. 2023',
      'Dos : WE CRY BETTER IN LAMBORGHINI + Countach',
      'Coloris : blanc / imprimé jaune',
    ],
    material: [
      '100 % coton peigné, 220 gsm',
      'Coupe relax unisexe',
      'Lavage doux',
      'Impression haute qualité',
    ],
  },
  {
    id: 'job-unemployed',
    slug: 'job-unemployed-source-of-income-unknown',
    name: 'JOB : UNEMPLOYED — SOURCE OF INCOME : UNKNOWN',
    tagline: 'Honesty, printed.',
    phrase: ['JOB', 'UNEMPLOYED', 'SOURCE OF INCOME', 'UNKNOWN'],
    price: 2995,
    compareAtPrice: 3995,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: jobUnemployedVariants,
    isNew: false,
    isBestseller: false,
    description:
      'Le tee qui assume l’ironie sans filtre. Face TOLD · EST. 2023, dos typographique « JOB : UNEMPLOYED / SOURCE OF INCOME : UNKNOWN » — un statement sec, drôle et immédiatement lisible.',
    descriptionExtra:
      'Trois coloris de tee (blanc, bleu, rouge) avec contrastes d’impression adaptés. Même base TOLD : coton peigné 220 gsm, coupe relax unisexe, finitions soignées. Idéal pour un look streetwear assumé.',
    details: [
      'Face : TOLD · EST. 2023',
      'Dos : JOB : UNEMPLOYED / SOURCE OF INCOME : UNKNOWN',
      '3 coloris : blanc, bleu, rouge',
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
