import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function login() {
  return http.get(getUrl('/login'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function register() {
  return http.get(getUrl('/register'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function logout() {
  return http.post(getUrl('/logout'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}
