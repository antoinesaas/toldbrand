'use client'

import { useEffect } from 'react'
import { REGIONS, useLocaleStore } from '@/lib/locale-store'

export default function LocaleSync() {
  const { language, locale, country, setRegion } = useLocaleStore()

  useEffect(() => {
    const region = REGIONS.find((r) => r.country === country) ?? REGIONS[0]
    const state = useLocaleStore.getState()
    if (state.language !== region.language || state.locale !== region.locale) {
      setRegion(country)
    }
  }, [country, setRegion])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.setAttribute('data-locale', locale)
  }, [language, locale])

  return null
}
