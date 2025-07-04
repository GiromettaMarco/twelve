import { locales } from '@/lib/date-locales'
import { format as originalFormat } from 'date-fns'

/**
 * Wrapper for the date-fns format function, with short codes for locale.
 *
 * @see https://date-fns.org/docs/format
 *
 * @param date The date to format
 * @param locale Locale short code (between the suported ones)
 * @param formatStr Format pattern
 * @returns The formatted date string
 */
export function format(date: string | number | Date, locale: string, formatStr: string = 'PPP') {
  return originalFormat(date, formatStr, {
    locale: locales[locale]
  })
}

/**
 * Format date for database insert.
 *
 * @param date A date object
 */
export function formatDateForDB(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`
}
