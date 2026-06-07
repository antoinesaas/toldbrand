/**
 * Gelato ecommerce store product mapping.
 * Each site product slug maps to its Gelato store variant IDs per size.
 * These IDs are immutable — tied to the artwork uploaded in Gelato dashboard.
 *
 * Store ID: 9a22dc4f-fa1d-489d-917b-142dc011c1ac
 */

export const GELATO_STORE_ID = '9a22dc4f-fa1d-489d-917b-142dc011c1ac'

/** productSlug → { size → Gelato variant UUID } */
export const GELATO_VARIANTS: Record<string, Record<string, string>> = {
  'kanye-west-east': {
    S:   '69429b99-a3bd-42c5-aa14-680a29a74c3f',
    M:   'f4d4c875-cb67-4017-97e9-9b7f1733d3d5',
    L:   '3e38b7ef-cec1-4bbb-9e8e-0158cd2a53c2',
    XL:  'f5af24c3-cc53-419f-a8ea-98bf1385b300',
    '2XL': '2ec4fd41-813d-455d-80d8-50841f5dc70c',
  },
  'billionaires-backstage': {
    S:   '57493706-48a4-4fbd-985e-4ae4324d2b15',
    M:   '3bb5bdf0-3e15-4e18-aa9a-15ea0a4defdf',
    L:   'ac94b570-f6d3-4b66-a6f0-06d1d3a67b92',
    XL:  '49173e02-91ba-4353-94db-d22ebf4b682c',
    '2XL': '719d6ca8-1b26-4af9-9430-a5d629930175',
  },
  'world-peace': {
    S:   'bebfef6d-b80e-4b5e-899b-b813e4dd47b4',
    M:   '31c6e36c-c01e-4983-9ba9-de83a70fd18d',
    L:   '8bdf05f9-4635-4535-ae85-42e0e16af712',
    XL:  '52cfc5ce-3540-405e-ab90-70c0e8eb8205',
    '2XL': '1c6b0ef9-5d8b-4a8d-994b-e7a61d0631df',
  },
  'breaking-bread': {
    S:   'ac202bcb-31db-4580-9ba0-90664d6ccd87',
    M:   'e37bf276-90c6-4421-aad2-ea0f516111b2',
    L:   '90201e7b-748c-4768-b072-ec9a78092e52',
    XL:  'b678de57-8734-45af-943a-eea82abebfb1',
    '2XL': '64a598fd-8209-40d0-83ba-201903f64900',
  },
  'jewpiter': {
    S:   '9abeaab8-343f-4725-8f53-48a92dfa571e',
    M:   '79a74f6f-02ef-4304-a698-1b95d8b3849d',
    L:   'b9da3e69-55bf-478e-8c4f-fa7c5ea68726',
    XL:  '4ce29b66-bba7-4f98-99cf-5c3efd8cc0ab',
    '2XL': 'c2bee5b3-b29d-41b8-9483-f569598bfcd8',
  },
  'lara-ciste': {
    S:   '3d748247-87b1-4cbd-b2a3-623ff2ff8f78',
    M:   '9dfb7dde-1fbb-4e7e-a7d9-bbc1df9100ae',
    L:   'e2325fb6-425a-4236-a300-565d5d784fef',
    XL:  '53b6a775-10cf-4065-8b27-32b6a1976c10',
    '2XL': '255fb459-2c05-4522-be2c-365bbb9d84cd',
  },
  'sybau': {
    S:   'd251c86d-dd7b-4d1b-8aad-6eca455965b8',
    M:   'c32b1ba7-a66e-4194-bd50-74315c3a468f',
    L:   '07d22d45-4118-4151-9e12-bdb5f631f1cb',
    XL:  '1d99894f-ef90-4fd8-86af-5ca889792a06',
    '2XL': '3af5ac9e-2622-4ba3-8fa4-5f997284269e',
  },
  'the-don': {
    S:   '3aef4f87-4596-4dc3-9bc4-aee1c0d2ce96',
    M:   '7317be80-9e73-4953-9c2e-28214a13310d',
    L:   'c0457258-fdc9-4d8c-a4b0-c811a76310ba',
    XL:  '863090b1-0da8-457d-af6c-aa58ec3dda65',
    '2XL': '4608599d-1c98-492d-8b55-3070110b336e',
  },
  'jeffrey': {
    S:   '6dccd982-092d-4816-9830-4f1a45a0f7e7',
    M:   '2a1a6a05-3fcb-404f-bdee-b77c29392cfe',
    L:   '818273ca-e06d-410f-b439-e86097ad752f',
    XL:  '838a93ae-c9ca-4c1f-9503-351bb1de9b48',
    '2XL': '71114112-21f6-4559-9193-388ba18b8580',
  },
  'shrock': {
    S:   '7308edf3-2c32-4a20-93bf-01b5a285b87d',
    M:   '1b073797-b2b9-4ac8-bd9d-8430a335afa7',
    L:   'ae3292e9-a6ba-42ff-9c0e-6da12cbfdcbd',
    XL:  '46a43784-52b7-4dbe-bc6b-b4796eca0bb4',
    '2XL': '26e6fdf7-80b0-4ea6-9b9c-c9adaed8e692',
  },
}

/**
 * Returns the Gelato variant UUID for a given product + size.
 * Throws if the combination is not found.
 */
export function getGelatoVariantId(productSlug: string, size: string): string {
  const variants = GELATO_VARIANTS[productSlug]
  if (!variants) {
    throw new Error(`No Gelato variants configured for product: ${productSlug}`)
  }
  const variantId = variants[size]
  if (!variantId) {
    throw new Error(`No Gelato variant for product "${productSlug}" size "${size}"`)
  }
  return variantId
}
