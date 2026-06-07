import type { Product, ProductVariant } from '@/types'
import { GELATO_CATALOG, gelatoUidFromEnv } from '@/lib/gelato-catalog'

const gelatoUid = (key: string, fallback: string) => gelatoUidFromEnv(key, fallback)

const cryBetterLamborghiniVariant: ProductVariant = {
  color: 'white',
  label: 'Blanc / Jaune',
  hex: '#FFFFFF',
  front: '/images/products/cry-better-lamborghini/white/front.png',
  back: '/images/products/cry-better-lamborghini/white/back.png',
  lifestyle: '/images/products/cry-better-lamborghini/white/lifestyle.png',
  gelatoProductUid: gelatoUid('CRY_BETTER_LAMBORGHINI', GELATO_CATALOG.CLASSIC_TEE_WHITE),
}

export const PRODUCTS: Product[] = [
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
