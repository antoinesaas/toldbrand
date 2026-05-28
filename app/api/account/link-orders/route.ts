import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { linkOrdersToUser } from '@/lib/orders'

export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await linkOrdersToUser(user.id, user.email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to link orders'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
