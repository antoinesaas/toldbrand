'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n/use-i18n'

export default function SuccessPage() {
  const { t } = useI18n()

  return (
    <div className="pt-32 min-h-screen bg-white px-6 text-center">
      <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">{t.success.title}</h1>
      <p className="text-neutral-600 max-w-md mx-auto mb-8">{t.success.message}</p>
      <Link
        href="/shop"
        className="inline-block text-xs tracking-[0.2em] uppercase border border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
      >
        {t.success.cta}
      </Link>
    </div>
  )
}
