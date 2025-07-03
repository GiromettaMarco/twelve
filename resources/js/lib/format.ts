import { locales } from '@/lib/date-locales'
import { format } from 'date-fns'

export default function (date: string | number | Date, locale: string, formatStr: string = 'PPP') {
  return format(date, formatStr, {
    locale: locales[locale]
  })
}
