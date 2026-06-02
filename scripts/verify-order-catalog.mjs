/**
 * Vérifie le mapping produit → Gelato (UID + URLs d'impression) sans créer de commande.
 * Usage: node scripts/verify-order-catalog.mjs [baseUrl]
 */
const BASE = (process.argv[2] || 'https://toldbrand.fr').replace(/\/$/, '')

const EXPECTED = {
  'eat-french': {
    pink: 'gco_white',
    blue: 'gco_royal-blue',
    black: 'gco_black',
  },
  'cry-better-lamborghini': { white: 'gco_white' },
  'job-unemployed': {
    white: 'gco_white',
    blue: 'gco_royal-blue',
    red: 'gco_red',
  },
}

async function headOk(url) {
  const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
  return res.ok
}

async function main() {
  const res = await fetch(`${BASE}/api/products`)
  if (!res.ok) {
    console.error('FAIL products API', res.status)
    process.exit(1)
  }
  const products = await res.json()
  let errors = 0

  for (const product of products) {
    const rules = EXPECTED[product.id]
    if (!rules) {
      console.log('SKIP unknown product', product.id)
      continue
    }

    for (const variant of product.variants) {
      const expectedCo = rules[variant.color]
      const uid = variant.gelatoProductUid ?? ''
      const uidOk = expectedCo ? uid.includes(expectedCo) : Boolean(uid)

      const frontUrl = `${BASE}${variant.front}`
      const backUrl = `${BASE}${variant.back}`
      const [frontOk, backOk] = await Promise.all([headOk(frontUrl), headOk(backUrl)])

      const line = `${product.id}/${variant.color}`
      if (!uidOk || !frontOk || !backOk) {
        errors++
        console.log('FAIL', line, {
          uid: uid.slice(0, 60),
          expectedCo,
          frontOk,
          backOk,
        })
      } else {
        console.log('OK  ', line, uid.includes('_gsi_m_') ? 'size M baseline' : uid.slice(0, 48))
      }
    }

    if (product.id === 'eat-french' && product.price !== 3995) {
      errors++
      console.log('FAIL eat-french price', product.price, 'expected 3995 (39,95 €)')
    }
  }

  console.log(errors ? `\n${errors} error(s)` : '\nAll catalog checks passed')
  process.exit(errors ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
