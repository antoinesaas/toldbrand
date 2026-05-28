'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ACCOUNT_COPY } from '@/lib/order-labels'
import { useI18n } from '@/lib/i18n/use-i18n'

export default function AccountHeader() {
  const { language } = useI18n()
  const t = ACCOUNT_COPY[language]
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
      <Link href="/account/orders" className="text-xs uppercase tracking-[0.15em]">
        {t.myOrders}
      </Link>
      <button
        type="button"
        onClick={signOut}
        className="text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black"
      >
        {t.signOut}
      </button>
    </div>
  )
}
