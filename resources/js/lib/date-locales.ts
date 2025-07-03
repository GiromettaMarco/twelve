import type { Locale } from 'date-fns'
import { it } from 'date-fns/locale'

interface Locales {
  [key: string]: Locale
}

export const locales: Locales = { it }
