import { NextResponse } from 'next/server'

/**
 * Vérifie la clé GELATO_API_KEY sans créer de commande.
 * (Les anciens tests POST créaient de vraies commandes facturables — ne plus faire ça.)
 */
export async function GET() {
  const key = process.env.GELATO_API_KEY?.trim()

  if (!key) {
    return NextResponse.json({
      ok: false,
      configured: false,
      hint: 'Ajoutez GELATO_API_KEY dans Vercel (Production), sans retour à la ligne.',
    })
  }

  const res = await fetch('https://order.gelatoapis.com/v4/orders?limit=1', {
    headers: { 'X-API-KEY': key },
    cache: 'no-store',
  })

  const body = await res.text()
  let hint = ''

  if (res.status === 401 || res.status === 403) {
    hint =
      'Clé refusée : régénérez une clé API Gelato et recolle-la dans Vercel (sans saut de ligne).'
  } else if (res.ok || res.status === 404) {
    hint = 'Clé acceptée par Gelato. Aucune commande créée par ce test.'
  } else {
    hint = `Réponse Gelato ${res.status} — la clé est probablement valide si ce n’est pas 401/403.`
  }

  return NextResponse.json({
    ok: res.status !== 401 && res.status !== 403,
    configured: true,
    httpStatus: res.status,
    hint,
    createsOrders: false,
  })
}
