/**
 * Gelato store variant mapping.
 * productSlug -> color -> size -> ecommerce variant ID
 *
 * Used with order.gelatoapis.com/v4/orders via productVariantId.
 * Store ID: 9a22dc4f-fa1d-489d-917b-142dc011c1ac
 */

export const GELATO_STORE_ID = '9a22dc4f-fa1d-489d-917b-142dc011c1ac'

/** productSlug -> color -> size -> variantId */
export const GELATO_VARIANTS: Record<string, Record<string, Record<string, string>>> = {
  'porsche-star-wars': {
    black: { S: '81f81a8c-d75a-4ca0-91a6-6b36e31f85d4', M: '67155759-d607-4341-9c89-d55992ac49d3', L: '6c89a594-5c55-4157-8921-78e78433de4b', XL: 'da27e9d0-0462-4b09-b69e-a272666ff5a3', '2XL': 'adca035a-297b-48f3-920c-a0fb86bcd295' },
    white: { S: '3e7d64ea-ff81-4a0f-9b7a-96ad55386426', M: '800145f7-0fa5-48ee-a02c-8a1a0dddc7da', L: '0243d669-842a-4bb8-be96-f25d4781875f', XL: 'ad846ced-06d5-4465-b8eb-0a53096fd66b', '2XL': '029ca5db-0ba2-4ab9-bb1c-522a103e94f6' },
  },
  'moto': {
    black: { S: 'bbea5823-d72f-4bf2-aed7-f9c4807da134', M: 'c25fbc86-40e7-4040-b91e-90b679cb5fda', L: 'aa3021dc-3ba2-40bc-8fcc-23f76a6f480a', XL: '78c592d2-de63-435b-bb34-9c4d3df05925', '2XL': '11d16ea1-2274-4f8c-8c36-83a8f3b062da' },
    white: { S: '70caee00-ac76-4ff6-99c3-9c82c8b6221e', M: '528e10a6-b242-4b99-b4d5-5bba9fae01e6', L: '98c3c6b1-b93c-4b68-b000-9cee63d69cb4', XL: '3e897043-0a96-49c4-aa01-0329c237d7d2', '2XL': 'f774bf46-f2ac-4105-ab68-cbd18e5859c4' },
  },
  'ski': {
    black: { S: 'cb666b10-9b75-445e-a067-4d8ffabaa2e1', M: '34815bcf-1dce-4957-8b35-2fe645c1914f', L: '9411e3ed-ba71-4eb1-bba3-70ff55d6f7c0', XL: '69643c5d-7314-4bb8-8b48-89ea26b05e29', '2XL': '2d524479-477b-4742-b439-f56d440951f6' },
    white: { S: '107fe384-f501-456b-899a-8310aeaa4599', M: 'b54efe33-2976-40c8-8f96-e5f6dfbeebc7', L: '93dab991-22f3-4403-8a3a-c316091e2e62', XL: '1e218e88-df74-4d1f-b3fe-90fb9ac34c59', '2XL': 'e983830d-b67d-4e31-8b17-f116f54fa0e7' },
  },
  'porsche-white': {
    black: { S: '2196d9fc-f50a-4cd8-b862-a7be07a106cb', M: 'd30dcfa7-ced8-4237-9bd5-8b4b55e8a5d2', L: 'e2402a68-f687-45d1-8192-e9d40e94b1aa', XL: 'cd9619fa-c000-4d20-bcd0-069a6d2548c2', '2XL': 'dbde94bb-ff59-49e3-89b4-380445ebaae7' },
    white: { S: 'dab13efe-d30d-4e91-823e-77b3705db298', M: '1d430073-85ff-4f29-a8d2-637355e743e7', L: '596b5532-aede-475d-8532-d3b9001b285d', XL: '05a64ebc-3ca0-4963-ac8b-ff9219a42a7c', '2XL': '05d1b030-dd2a-4b0f-891d-39ae5e1b16d8' },
  },
  'nissan-gtr': {
    black: { S: '6e7cced2-204b-497a-806b-89baa8df280a', M: 'ca02b661-e995-4c83-aeb6-2a74a1e97ddc', L: '8fccd895-867d-4e3b-9301-dc2d51ae4733', XL: 'f913a33f-424a-46a7-8b53-9e6ff9e52be8', '2XL': '9503f0f7-021b-438a-8759-12c6da3cfb45' },
    white: { S: '396b4131-5e12-4f70-b0bd-11eb4bb61d7e', M: '4e34fcc8-8edf-46ec-9b3c-0a540edb1395', L: '1c627daf-2433-458f-9822-ef1696691c37', XL: '71c75053-f130-4582-ae2f-119f642a5129', '2XL': '67843028-8b58-450d-a8e7-6f516660915e' },
  },
  'supra-cine': {
    black: { S: 'd4f9b6dd-a16c-40d7-9eae-f1ba6ec95aee', M: '0e8f46ae-f560-420e-bc99-bd2eb9014927', L: 'ad9524a6-0e6e-457a-b675-7df086f90a6f', XL: 'dd1673c9-e8f0-4d34-9c60-ae35a416f821', '2XL': '66cb0e8d-907f-43e9-9a3a-679086ddc163' },
    white: { S: 'ea847633-8c71-4b16-af75-a30742103ae5', M: '602f2ce7-9f65-4e82-b3f6-a71da609b3a4', L: 'b526ad0e-d11d-491d-8108-af8e98bdea07', XL: 'c35dccbd-ecc2-4619-aaca-861f05dc1510', '2XL': 'fb41d9e6-c2b2-4a53-afd0-12efe0033e53' },
  },
  'porsche-black': {
    black: { S: '384a28d1-6d80-409b-ae49-c7d25dbfbd67', M: 'a875793c-37a5-46ee-88a1-bc86ac601b88', L: 'ca819a97-bfa2-4dae-a947-a8b6b6880154', XL: '625f816e-31d1-468f-a82c-6bb24d9b3f7d', '2XL': '54f23ff9-7aa9-467d-b9de-3149dae0d32b' },
    white: { S: 'd0df97c6-5cc1-4674-8fcd-c84b347fa576', M: '211298e6-625f-40fa-bc88-ff54f19c06ee', L: 'be2f27e0-f180-4aaf-9d19-2694e2da566d', XL: '49aa8715-2568-49b9-8117-2902f0b0788e', '2XL': 'bccfbf40-70f4-4df0-99ff-0f7adbd0816b' },
  },
  'mercedes': {
    black: { S: '529168d7-0779-4cf2-9b3f-36b9e634c253', M: '340fd277-a3b4-4411-bb79-72378c296e86', L: 'b987f4d1-b0ef-44c6-8bff-31d83e9f8ea3', XL: 'aa28a91d-d9d3-46bd-beab-1036c880aad3', '2XL': '5777c5ba-defe-4a0c-9e71-21055a03130b' },
    white: { S: '51984ab0-1f36-442a-ae27-fd143c0a4336', M: 'e00d59cb-b7d0-47ee-84ca-403d821f1220', L: 'eccecade-1e7c-42e3-84b4-da48a6f19a7a', XL: '3f3905b6-9fb9-430f-be90-5d64c25ffb71', '2XL': '53d34317-12c0-441d-a48f-7b3ae72d6147' },
  },
  'f1': {
    black: { S: '7d1d2715-5c83-4fbc-a1a2-89efe9d20a73', M: 'b118efc9-e219-4224-86bf-0c361a9261ce', L: '44c18e58-6d2b-4693-bf0e-e0391a2be3d4', XL: 'f03b3488-7481-4168-824b-446641245a29', '2XL': '383f7027-381e-48c7-a4b1-89b418f88b83' },
    white: { S: 'b5977ac4-83df-4261-b4c5-93d4d44ecf13', M: '2b0b4ff5-1bb6-40e0-86be-350a87ed83cb', L: 'd29a51f3-e1c9-4494-9ed8-c9d77aee36ae', XL: '6b5a7f37-7b4c-4df7-b27d-9cf0b9596f05', '2XL': '2acc5ef5-ff97-4e68-af15-5145e80297f1' },
  },
  'konigsegg': {
    black: { S: 'fe5f802b-0cdc-402e-83a1-660354127e2b', M: 'a6c63f56-51e0-4d4d-803b-368918d8477e', L: '54098d52-3e48-4576-a6ee-ec636d5ce9e2', XL: '87ff88c6-732d-42e4-82fd-82a26fb90afa', '2XL': 'afc2cc4f-5de1-409b-8dc9-8812ea193bc2' },
    white: { S: 'cb960290-8fc0-48e6-8db7-50eb409229b5', M: '4b270e64-7231-4a52-a7f2-7d0c13d84f88', L: 'd3dac208-bb0a-49f4-a2f4-2cf2243ab83e', XL: 'eea2d45c-b32b-49eb-9660-da95a9359a0e', '2XL': 'fd6f2530-67ef-43d7-ab6b-86796b8937e4' },
  },
}

/**
 * Returns the Gelato store variant ID for a given product, color, and size.
 * Used with order.gelatoapis.com/v4/orders as productVariantId.
 */
export function getGelatoVariantId(slug: string, color: string, size: string): string {
  const byColor = GELATO_VARIANTS[slug]
  if (!byColor) throw new Error(`No Gelato variants configured for product: ${slug}`)
  const bySize = byColor[color]
  if (!bySize) throw new Error(`No Gelato variants for product "${slug}" color "${color}"`)
  const id = bySize[size]
  if (!id) throw new Error(`No Gelato variant for product "${slug}" color "${color}" size "${size}"`)
  return id
}
