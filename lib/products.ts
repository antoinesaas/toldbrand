import type { Product, ProductVariant } from '@/types'
import { GELATO_CATALOG, gelatoUidFromEnv } from '@/lib/gelato-catalog'

const uid = (key: string) => gelatoUidFromEnv(key, GELATO_CATALOG.CLASSIC_TEE_WHITE)

function tee(
  key: string,
  slug: string,
  name: string,
  tagline: string,
  phrase: string[],
  description: string,
  details: string[],
  ext: 'png' | 'jpg' = 'png'
): Product {
  const lifestyle =
    ext === 'jpg'
      ? `/images/products/${slug}/lifestyle.jpg`
      : `/images/products/${slug}/lifestyle.png`

  const variant: ProductVariant = {
    color: 'white',
    label: 'Blanc',
    hex: '#FFFFFF',
    front: `/images/products/${slug}/mockup.png`,
    back: `/images/products/${slug}/mockup.png`, // front-only print, same file
    lifestyle,
    gelatoProductUid: uid(key),
  }

  return {
    id: slug,
    slug,
    name,
    tagline,
    phrase,
    price: 2995,
    compareAtPrice: 2995,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [variant],
    isNew: true,
    isBestseller: false,
    description,
    details,
    material: [
      '100 % coton peigne, 220 gsm',
      'Coupe relax unisexe',
      'Impression haute qualite recto',
      'Lavage 30°C',
    ],
  }
}

export const PRODUCTS: Product[] = [
  tee(
    'KANYE_WEST_EAST',
    'kanye-west-east',
    'KANYE WEST / KANYE EAST',
    'Neither north.',
    ['KANYE', 'WEST', 'KANYE', 'EAST'],
    'Il regarde a gauche. Il regarde a droite. C\'est le meme. La direction n\'a jamais vraiment importe.',
    ['Face : TOLD · EST. 2025', 'Dos : Kanye West / Kanye East', 'Coloris : blanc']
  ),
  tee(
    'BILLIONAIRES_BACKSTAGE',
    'billionaires-backstage',
    'BILLIONAIRES BACKSTAGE',
    'Money. Vibes. No comment.',
    ['BILLIONAIRES', 'BACKSTAGE'],
    'Deux gars dans une piece. Des milliards entre eux. Et apparemment du bon son.',
    ['Face : TOLD · EST. 2025', 'Dos : Billionaires Backstage', 'Coloris : blanc']
  ),
  tee(
    'WORLD_PEACE',
    'world-peace',
    'WORLD PEACE',
    'Summit exclusive. No press.',
    ['WORLD', 'PEACE'],
    'Deux chefs d\'Etat. Un fisheye. Une bouteille. Ce que la diplomatie ne montre jamais.',
    ['Face : TOLD · EST. 2025', 'Dos : World Peace', 'Coloris : blanc']
  ),
  tee(
    'BREAKING_BREAD',
    'breaking-bread',
    'BREAKING BREAD',
    'I am the one who knocks on heaven.',
    ['BREAKING', 'BREAD'],
    'Il est mort pour tes peches. Mais il est revenu pour l\'empire. Breaking Bread — saison finale.',
    ['Face : TOLD · EST. 2025', 'Dos : Breaking Bread', 'Coloris : blanc'],
    'jpg'
  ),
  tee(
    'JEWPITER',
    'jewpiter',
    'JEWPITER',
    'The chosen planet.',
    ['JEW', 'PITER'],
    'La cinquieme planete du systeme solaire. La plus grande. La plus choisie. Jewpiter.',
    ['Face : TOLD · EST. 2025', 'Dos : Jewpiter', 'Coloris : blanc']
  ),
  tee(
    'LARA_CISTE',
    'lara-ciste',
    'LARA CISTE',
    'Aventuriere. No comment on the rest.',
    ['LARA', 'CISTE'],
    'Elle cherche des artefacts. Elle penetre les temples. Elle a des opinions tres arretees sur l\'identite nationale.',
    ['Face : TOLD · EST. 2025', 'Dos : Lara Ciste', 'Coloris : blanc']
  ),
  tee(
    'SYBAU',
    'sybau',
    'SYBAU',
    "C'est beau.",
    ['SY', 'BAU'],
    'Un pigeon. Des flammes. L\'eau. Un regard qui juge. Sybau — l\'art de ne rien comprendre et d\'y trouver de la beaute.',
    ['Face : TOLD · EST. 2025', 'Dos : Sybau', 'Coloris : blanc']
  ),
  {
    ...tee(
      'THE_DON',
      'the-don',
      'THE DON',
      'No caption needed.',
      ['THE', 'DON'],
      'Un geste. Toute une philosophie. The Don ne parle pas — il communique.',
      ['Face : TOLD · EST. 2025', 'Dos : The Don', 'Coloris : blanc']
    ),
    price: 1995,
    compareAtPrice: 2995,
  },
  {
    ...tee(
      'JEFFREY',
      'jeffrey',
      'JEFFREY',
      "He didn't kill himself.",
      ['JEFFREY'],
      "Le sourire le plus celebre de l'histoire recente. Jeffrey — une icone. Une legende. Un mystere.",
      ['Face : TOLD · EST. 2025', 'Dos : Jeffrey', 'Coloris : blanc']
    ),
    price: 1995,
    compareAtPrice: 2995,
  },
  {
    ...tee(
      'SHROCK',
      'shrock',
      'SHROCK',
      'Zero explanation needed.',
      ['SHROCK'],
      'La moitie Shrek, la moitie Rock, cent pour cent inexplicable. SHROCK — quelque part dans le bayou.',
      ['Face : TOLD · EST. 2025', 'Dos : Shrock', 'Coloris : blanc']
    ),
    price: 1995,
    compareAtPrice: 2995,
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
