export type ProductColor = 'pink' | 'blue' | 'black' | 'white'
export type ProductSize = 'S' | 'M' | 'L' | 'XL' | '2XL'

export interface ProductVariant {
  color: ProductColor
  label: string
  hex: string
  front: string
  back: string
  lifestyle: string
  gelatoProductUid: string
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  phrase: string[]
  price: number
  compareAtPrice: number
  sizes: ProductSize[]
  variants: ProductVariant[]
  isNew: boolean
  isBestseller: boolean
  description: string
  details: string[]
  material: string[]
}

export interface CartItem {
  id: string
  productId: string
  name: string
  size: ProductSize
  color: ProductColor
  colorLabel: string
  price: number
  quantity: number
  imageUrl: string
  gelatoProductUid: string
}

export interface GelatoOrderItem {
  itemReferenceId: string
  productUid: string
  quantity: number
  files: unknown[]
}

export interface GelatoOrder {
  orderReferenceId: string
  customerReferenceId: string | null | undefined
  currency: string
  items: GelatoOrderItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2: string
    city: string
    postCode: string
    country: string
    email: string
  }
}
