'use client'

import { createClient } from '@/lib/supabase/client'

/** Redirects to login if guest; returns user id when authenticated. */
export async function requireAuthForCheckout(returnPath: string): Promise<string | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) return user.id

  const next = returnPath.startsWith('/') ? returnPath : `/${returnPath}`
  window.location.href = `/account/login?redirect=${encodeURIComponent(next)}`
  return null
}
