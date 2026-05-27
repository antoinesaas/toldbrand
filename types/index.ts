export interface Product {
  id: string
  slug: string
  name: string
  phrase: string[]
  gelatoProductId: string
  price: number
  compareAtPrice: number
  colors: ProductColor[]
  sizes: ProductSize[]
  images: Record<string, string[]>
  isNew: boolean
  isBestseller: boolean
  description?: string
}

export type ProductColor = 'white' | 'black'
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL'

export interface CartItem {
  id: string
  productId: string
  name: string
  size: ProductSize
  color: ProductColor
  price: number
  quantity: number
  imageUrl: string
  gelatoProductId: string
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
