'use client'

import { formatPriceForCurrency, useLocaleStore } from '@/lib/locale-store'

export function useFormatPrice() {
  const { currency, locale } = useLocaleStore()
  return (cents: number) => formatPriceForCurrency(cents, currency, locale)
}
