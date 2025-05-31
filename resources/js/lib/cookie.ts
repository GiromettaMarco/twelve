import { isDocument } from '@/lib/utils'

export const setCookie = (name: string, value: string | number | boolean, days = 365) => {
  if (!isDocument()) {
    return
  }

  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`
}

export const getCookie = (name: string) => {
  if (!isDocument()) {
    return
  }

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}
