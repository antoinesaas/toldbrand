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
    'CHROME GHOST',
    'No lane. No limit.',
    ['CHROME', 'GHOST'],
    'Le viseur orange. La route derriere. Tout le reste est bruit.',
    ['Face : TOLD · EST. 2025', 'Dos : Chrome Ghost', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'ski',
    'WHITE NOISE',
    'First track. Last stop.',
    ['WHITE', 'NOISE'],
    'Avant le depart. Apres l\'arrivee. Entre les deux, juste la vitesse et le silence.',
    ['Face : TOLD · EST. 2025', 'Dos : White Noise', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'porsche-white',
    'POLAR WHITE',
    'Clean. Mean. White.',
    ['POLAR', 'WHITE'],
    'La Porsche blanche. L\'esthetique au-dessus de tout le reste.',
    ['Face : TOLD · EST. 2025', 'Dos : Polar White', 'Coloris : noir ou blanc'],
    1995, 2995,
  ),
  tee(
    'nissan-gtr',
    'TOKYO GHOST',
    'Godzilla never sleeps.',
    ['TOKYO', 'GHOST'],
    'Des phares rouges dans la nuit de New York. La Godzilla n\'a pas besoin de lumiere pour te trouver.',
    ['Face : TOLD · EST. 2025', 'Dos : Tokyo Ghost', 'Coloris : noir ou blanc'],
  ),
  tee(
    'supra-cine',
    'CINEMA NOIRE',
    'Scene. Car. Girl. Night.',
    ['CINEMA', 'NOIRE'],
    'Une Toyota Supra sous la pluie. Une femme au sommet. Un cadre cinematique. TOLD.',
    ['Face : TOLD · EST. 2025', 'Dos : Cinema Noire', 'Coloris : noir ou blanc'],
  ),
  tee(
    'porsche-black',
    'PHANTOM',
    'Stealth mode on.',
    ['PHANTOM'],
    'La Porsche noire vue du ciel. Meme de loin, elle est immediatement reconnaissable.',
    ['Face : TOLD · EST. 2025', 'Dos : Phantom', 'Coloris : noir ou blanc'],
  ),
  tee(
    'mercedes',
    'VITESSE ROUGE',
    'Das Beste oder nichts.',
    ['VITESSE', 'ROUGE'],
    'Le flou rouge d\'une Mercedes en mouvement. Elle ne s\'arrete pas — elle disparait.',
    ['Face : TOLD · EST. 2025', 'Dos : Vitesse Rouge', 'Coloris : noir ou blanc'],
  ),
  tee(
    'f1',
    'PIT STOP',
    '300 km/h. Then stop for gas.',
    ['PIT', 'STOP'],
    'Une Formule 1 a la pompe a essence. Le contraste parfait entre la vitesse absolue et le quotidien.',
    ['Face : TOLD · EST. 2025', 'Dos : Pit Stop', 'Coloris : noir ou blanc'],
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
