import { isDocument } from '@/lib/utils'

interface ClientCookies {
  [key: string]: string | undefined
}

export function parseClientCookies(cookieString: string | null): ClientCookies {
  if (!cookieString) {
    return {}
  }

  const clientCookies: ClientCookies = {}

  const pairs = cookieString.split('; ')

  pairs.forEach((pair) => {
    const [name, value] = pair.split('=')
    clientCookies[name] = value
  })

  return clientCookies
}

export function setCookie(name: string, value: string | number | boolean, days = 365): string | undefined {
  if (!isDocument()) {
    return undefined
  }

  const maxAge = days * 24 * 60 * 60
  return (document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`)
}

export function getCookie(name: string): string | undefined {
  if (!isDocument()) {
    return undefined
  }

  const cookies = parseClientCookies(document.cookie)

  return cookies[name]
}
