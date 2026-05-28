import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { linkOrdersToUser } from '@/lib/orders'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account/orders'
  const safeNext = next.startsWith('/') ? next : '/account/orders'

  const oauthError =
    searchParams.get('error_description') ?? searchParams.get('error')
  if (oauthError) {
    return NextResponse.redirect(
      `${origin}/account/login?error=${encodeURIComponent(oauthError)}`
    )
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/account/login?error=missing_code`)
  }

  const redirectUrl = new URL(safeNext, origin)
  const response = NextResponse.redirect(redirectUrl)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      `${origin}/account/login?error=${encodeURIComponent(error.message)}`
    )
  }

  if (data.user?.email) {
    await linkOrdersToUser(data.user.id, data.user.email)
  }

  return response
}
