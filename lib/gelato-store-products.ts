/**
 * Gelato store product mapping.
 * Each slug maps to size -> { productUid, designId }.
 *
 * productUid: catalog UID for the blank Gildan 5000 in that size/color
 * designId:   Gelato design ID tied to the artwork uploaded per variant
 *
 * Used with order.gelatoapis.com/v4/orders (productUid + designId).
 * Store ID: 9a22dc4f-fa1d-489d-917b-142dc011c1ac
 */

export const GELATO_STORE_ID = '9a22dc4f-fa1d-489d-917b-142dc011c1ac'

export interface GelatoVariantData {
  productUid: string
  designId: string
}

/** productSlug -> size -> { productUid, designId } */
export const GELATO_DESIGNS: Record<string, Record<string, GelatoVariantData>> = {
  'kanye-west-east': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: '755aba95-1241-40a1-a7c0-cdc36c7d528d' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: '680fd45a-5223-419a-bc12-8011d8335eaa' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '0cb53a8f-50d6-4900-8699-5b29ac640125' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '1e3a2ca0-525f-4464-83e2-00d62f60b19b' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: 'fbc15d36-11ce-4fff-9dd2-81f3858eb1fd' },
  },
  'fih': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: '6fb1d3e8-5576-4df7-a5d2-8bfc71ba1940' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: 'cd835398-bbda-40cc-a838-b212df6f5f88' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '7a6c0aae-c61c-4857-81f8-e59522244e99' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '48b985d0-7d12-48fe-99b7-2a933083ca18' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: '23f9d234-8c91-4cf7-90f1-45f7e6f696a1' },
  },
  'world-peace': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: 'e09d1258-7bc6-46f1-97cf-1c94f1ca3232' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: 'dea69633-7841-4fd8-9ff8-428c4c88286e' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '82000b5c-8924-42b6-815c-b78e7aae3c1f' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: 'aea70d75-92e3-4966-8141-44c1c85031fb' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: 'cb12f594-797e-4312-84ce-a123bf1b362d' },
  },
  'breaking-bread': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: '6b78e7fe-a18e-4c30-bd79-e3ee7732eeb3' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: 'bcad35fa-d9a9-4f1c-9118-14e1aabcab5e' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '45fd407d-6870-48dc-b3ec-aca0f09a2a27' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: 'ad58d3a0-d7c2-4092-8024-5263eadcd1a5' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: '44fe9d77-07eb-4358-a333-b58f072f377b' },
  },
  'shrock': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: 'e974fd3a-0374-4129-abad-88a7322695f3' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: 'af10b502-33b4-4a18-bd91-17d37e084448' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '9b51107d-8f48-4ce3-8210-bd23ffdf1548' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '5923ac37-e0e7-4209-8de3-1b2f29efb9af' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: 'c285e432-0388-4757-9ed8-865df230c4fb' },
  },
  'jewpiter': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: '4e5fee6c-129f-47fc-a894-b72b6df270cc' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: '4d5f743d-c269-4cc4-a7c4-41643f9f87db' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: 'ac1f6664-4377-49c0-9df6-8f8341186f29' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '7abeea56-98e2-4161-8bfb-434cfea3f77f' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: 'be57bd5a-bfa2-4a8b-b403-206245629ccd' },
  },
  'lara-ciste': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: 'a8dc5170-457e-4a5a-8e0a-ce53f19fbcca' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: 'bc9923e2-aa11-43ea-a5f0-4f8cac52be73' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '996cbf49-fdba-4d38-bfaa-fda0611864b4' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '22bb1111-fdbb-4952-8b8e-ff79bb484366' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: '8c499b29-b3a1-49e8-862e-8a01ada80e56' },
  },
  'sybau': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: 'f28de850-615a-4493-af41-8dc3a72221bd' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: 'adaabd69-8671-47cf-8438-b37942929760' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: 'f7fa968a-e074-40f3-a3f6-cc89472c3625' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '91700e68-a068-4550-bdda-d557b7ef5e28' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: 'af256ef0-2860-40c7-b690-a2389097ae9c' },
  },
  'overstimulated': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: '1c3dcab4-98da-45f4-a869-3336fc15bb94' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: '7ab2ba42-3348-4cc4-91ea-bb52a4df85dc' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: 'b0a2146d-cb1a-40ed-8639-931998a2b6f4' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '85a0747b-8d37-449d-80a6-e3b7f4c9f684' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: '0a29ac9c-bb30-4dac-aa9f-d4dd7504aeb3' },
  },
  'jeffrey': {
    S:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_s_gco_white_gpr_4-0_gildan_5000',   designId: '09fdc42f-49b9-484f-87d2-3d112bdd04d5' },
    M:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_m_gco_white_gpr_4-0_gildan_5000',   designId: '4554b304-1562-49f0-9cc6-71a59ef5b6a0' },
    L:   { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_l_gco_white_gpr_4-0_gildan_5000',   designId: '3e422381-f056-4fcd-8d55-e9265945ae03' },
    XL:  { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_xl_gco_white_gpr_4-0_gildan_5000',  designId: '254b2339-b62f-47e3-a4b1-9d0d03317c45' },
    '2XL': { productUid: 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_heavy-weight_gsi_2xl_gco_white_gpr_4-0_gildan_5000', designId: '31d61d56-07b3-46bc-85b9-792d19f988bf' },
  },
}

/**
 * Returns the productUid and designId for a given product + size.
 * Throws if the combination is not found.
 */
export function getGelatoDesignData(productSlug: string, size: string): GelatoVariantData {
  const variants = GELATO_DESIGNS[productSlug]
  if (!variants) {
    throw new Error(`No Gelato designs configured for product: ${productSlug}`)
  }
  const data = variants[size]
  if (!data) {
    throw new Error(`No Gelato design for product "${productSlug}" size "${size}"`)
  }
  return data
}
