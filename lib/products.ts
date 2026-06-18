import type { Product, ProductVariant } from '@/types'

const BLACK_UID = 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_black_gpr_0-4_gildan_5000'
const WHITE_UID = 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_0-4_gildan_5000'

const MATERIAL = [
  '100 % coton peigne, 220 gsm',
  'Coupe relax unisexe',
  'Impression haute qualite dos',
  'Lavage 30°C',
]

function variants(slug: string): ProductVariant[] {
  const noLifestyle = slug === 'konigsegg'
  const lifestyle = noLifestyle
    ? `/images/products/${slug}/mockup.png`
    : `/images/products/${slug}/lifestyle.png`
  const mockupBlack = `/images/products/${slug}/mockup.png`
  const mockupWhite = `/images/products/${slug}/mockup-white.jpg`
  return [
    {
      color: 'black',
      label: 'Noir',
      hex: '#0a0a0a',
      front: mockupBlack,
      back: mockupBlack,
      lifestyle,
      gelatoProductUid: BLACK_UID,
    },
    {
      color: 'white',
      label: 'Blanc',
      hex: '#FFFFFF',
      front: mockupWhite,
      back: mockupWhite,
      lifestyle,
      gelatoProductUid: WHITE_UID,
    },
  ]
}

function tee(
  slug: string,
  name: string,
  tagline: string,
  phrase: string[],
  description: string,
  details: string[],
  price = 2995,
  compareAtPrice = 2995,
): Product {
  return {
    id: slug,
    slug,
    name,
    tagline,
    phrase,
    price,
    compareAtPrice,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: variants(slug),
    isNew: true,
    isBestseller: false,
    description,
    details,
    material: MATERIAL,
  }
}

export const PRODUCTS: Product[] = [
  tee(
    'porsche-star-wars',
    'PORSCHE X STAR WARS',
    'A galaxy far, far away. In Stuttgart.',
    ['PORSCHE', 'X', 'STAR WARS'],
    'Une Porsche. Un TIE Fighter. Deux icones qui n\'avaient rien a faire ensemble — et pourtant ca marche.',
    ['Face : TOLD · EST. 2025', 'Dos : Porsche x Star Wars', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'moto',
    'FLAT TRACK',
    'No lane. No limit.',
    ['FLAT', 'TRACK'],
    'Le viseur orange. La route derriere. Tout le reste est bruit.',
    ['Face : TOLD · EST. 2025', 'Dos : Flat Track', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'ski',
    'HORS PISTE',
    'First track. Last stop.',
    ['HORS', 'PISTE'],
    'Avant le depart. Apres l\'arrivee. Entre les deux, juste la vitesse et le silence.',
    ['Face : TOLD · EST. 2025', 'Dos : Hors Piste', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'porsche-white',
    'PORSCHE WHITE',
    'Clean. Mean. White.',
    ['PORSCHE', 'WHITE'],
    'La Porsche blanche. L\'esthetique au-dessus de tout le reste.',
    ['Face : TOLD · EST. 2025', 'Dos : Porsche White', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'nissan-gtr',
    'NISSAN GTR',
    'Godzilla never sleeps.',
    ['NISSAN', 'GTR'],
    'Des phares rouges dans la nuit de New York. La Godzilla n\'a pas besoin de lumiere pour te trouver.',
    ['Face : TOLD · EST. 2025', 'Dos : Nissan GTR', 'Coloris : noir ou blanc'],
  ),
  tee(
    'supra-cine',
    'SUPRA CINÉ',
    'Scene. Car. Girl. Night.',
    ['SUPRA', 'CINÉ'],
    'Une Toyota Supra sous la pluie. Une femme au sommet. Un cadre cinematique. TOLD.',
    ['Face : TOLD · EST. 2025', 'Dos : Supra Cine', 'Coloris : noir ou blanc'],
  ),
  tee(
    'porsche-black',
    'PORSCHE BLACK',
    'Stealth mode on.',
    ['PORSCHE', 'BLACK'],
    'La Porsche noire vue du ciel. Meme de loin, elle est immediatement reconnaissable.',
    ['Face : TOLD · EST. 2025', 'Dos : Porsche Black', 'Coloris : noir ou blanc'],
  ),
  tee(
    'mercedes',
    'MERCEDES BENZ',
    'Das Beste oder nichts.',
    ['MERCEDES', 'BENZ'],
    'Le flou rouge d\'une Mercedes en mouvement. Elle ne s\'arrete pas — elle disparait.',
    ['Face : TOLD · EST. 2025', 'Dos : Mercedes Benz', 'Coloris : noir ou blanc'],
  ),
  tee(
    'f1',
    'F1',
    '300 km/h. Then stop for gas.',
    ['F1'],
    'Une Formule 1 a la pompe a essence. Le contraste parfait entre la vitesse absolue et le quotidien.',
    ['Face : TOLD · EST. 2025', 'Dos : F1', 'Coloris : noir ou blanc'],
  ),
  tee(
    'konigsegg',
    'KONIGSEGG X DARKSTAR',
    'Built different. Priced accordingly.',
    ['KONIGSEGG', 'X', 'DARKSTAR'],
    'Un Konigsegg face a l\'infini de l\'ocean. L\'Etoile Noire sur 4 roues. Rien a ajouter.',
    ['Face : TOLD · EST. 2025', 'Dos : Konigsegg x Darkstar', 'Coloris : noir ou blanc'],
  ),
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
