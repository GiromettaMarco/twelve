import { format, type Locale } from 'date-fns'
import { it } from 'date-fns/locale'

interface Locales {
  [key: string]: Locale
}

const locales: Locales = { it }

export default function (date: string | number | Date, locale: string, formatStr: string = 'PPP') {
  return format(date, formatStr, {
    locale: locales[locale]
  })
}
