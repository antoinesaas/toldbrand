import type { Language } from './translations'

export function getStripeLocale(language: Language): 'fr' | 'de' | 'en' | 'it' | 'es' {
  if (language === 'fr') return 'fr'
  if (language === 'de') return 'de'
  if (language === 'it') return 'it'
  if (language === 'es') return 'es'
  return 'en'
}
