'use client'

import { useLocaleStore } from '@/lib/locale-store'
import { translations, type Language } from './translations'

export function useI18n() {
  const { language, locale, currency, country, setRegion } = useLocaleStore()
  const t = translations[language]

  return { t, language, locale, currency, country, setRegion }
}
