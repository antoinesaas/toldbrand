import { createClient } from '@supabase/supabase-js'

/**
 * Temps max d'une requête Supabase côté serveur.
 * Sans ça, un projet en pause / injoignable bloque la requête 15-20 s
 * (c'est ce qui faisait échouer le webhook Stripe).
 */
const SUPABASE_TIMEOUT_MS = 5000

const fetchWithTimeout: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    cache: 'no-store',
    signal: init?.signal ?? AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
  })

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!url || !key) {
    throw new Error('Supabase admin client is not configured')
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { fetch: fetchWithTimeout },
  })
}
