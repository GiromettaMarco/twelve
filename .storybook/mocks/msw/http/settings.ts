import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function settings() {
  return http.get(new RegExp(getUrl('/settings.*')), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function language() {
  return http.patch(getUrl('/settings/language'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function emailVerification() {
  return http.post(getUrl('/email/verification-notification'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function updateProfile() {
  return http.patch(getUrl('/settings/profile'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function deleteProfile() {
  return http.delete(getUrl('/settings/profile'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function password() {
  return http.put(getUrl('/settings/password'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}
