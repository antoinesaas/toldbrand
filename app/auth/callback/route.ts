import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkOrdersToUser } from '@/lib/orders'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account/orders'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user?.email) {
      await linkOrdersToUser(data.user.id, data.user.email)
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
