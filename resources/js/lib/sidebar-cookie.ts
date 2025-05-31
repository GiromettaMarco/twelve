import { SIDEBAR_COOKIE_NAME } from '@/lib/constants'
import { getCookie } from '@/lib/cookie'

export function getSidebarCookie() {
  const cookie = getCookie(SIDEBAR_COOKIE_NAME)

  if (typeof cookie === 'undefined') {
    return undefined
  }

  return cookie === 'true'
}
