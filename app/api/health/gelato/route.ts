import { NextResponse } from 'next/server'
import { GELATO_STORE_ID } from '@/lib/gelato-store-products'

const GELATO_ECOMMERCE_BASE = 'https://ecommerce.gelatoapis.com'

/**
 * Verifie la cle GELATO_API_KEY sans creer de commande.
 * Utilise l'API ecommerce (store products) - le meme endpoint que le vrai ordering.
 */
export async function GET() {
  const key = process.env.GELATO_API_KEY?.trim()

  if (!key) {
    return NextResponse.json({
      ok: false,
      configured: false,
      hint: 'Ajoutez GELATO_API_KEY dans Vercel (Production), sans retour a la ligne.',
    })
  }

  const res = await fetch(
    `${GELATO_ECOMMERCE_BASE}/v1/stores/${GELATO_STORE_ID}/products?limit=1`,
    {
      headers: { 'X-API-KEY': key },
      cache: 'no-store',
    }
  )

  let hint = ''

  if (res.status === 401 || res.status === 403) {
    hint = 'Cle refusee : regenerez une cle API Gelato et recollez-la dans Vercel (sans saut de ligne).'
  } else if (res.ok) {
    hint = 'Cle acceptee par Gelato ecommerce store. Aucune commande creee par ce test.'
  } else {
    hint = `Reponse Gelato ${res.status} - la cle est probablement valide si ce n'est pas 401/403.`
  }

  return NextResponse.json({
    ok: res.status !== 401 && res.status !== 403,
    configured: true,
    httpStatus: res.status,
    storeId: GELATO_STORE_ID,
    hint,
    createsOrders: false,
  })
}
