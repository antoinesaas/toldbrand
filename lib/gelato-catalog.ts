/** Gelato classic unisex crewneck tee — front + back print (gpr_4-4), size M baseline */
const CLASSIC_TEE_M = 'apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_m'

export const GELATO_CATALOG = {
  CLASSIC_TEE_WHITE: `${CLASSIC_TEE_M}_gco_white_gpr_4-4`,
  CLASSIC_TEE_NAVY: `${CLASSIC_TEE_M}_gco_navy_gpr_4-4`,
  CLASSIC_TEE_ROYAL_BLUE: `${CLASSIC_TEE_M}_gco_royal-blue_gpr_4-4`,
  CLASSIC_TEE_RED: `${CLASSIC_TEE_M}_gco_red_gpr_4-4`,
  CLASSIC_TEE_BLACK: `${CLASSIC_TEE_M}_gco_black_gpr_4-4`,
} as const

export function gelatoUidFromEnv(
  key: string,
  fallback: string
): string {
  const fromEnv = process.env[`GELATO_UID_${key}`]?.trim()
  if (fromEnv) return fromEnv
  const defaultUid = process.env.GELATO_DEFAULT_PRODUCT_UID?.trim()
  return defaultUid || fallback
}
