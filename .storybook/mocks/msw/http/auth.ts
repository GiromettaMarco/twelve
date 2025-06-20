import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function login() {
  return http.get(getUrl('/login'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function loginPost() {
  return http.post(getUrl('/login'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function register() {
  return http.get(getUrl('/register'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function registerPost() {
  return http.post(getUrl('/register'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function logout() {
  return http.post(getUrl('/logout'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function forgotPassword() {
  return http.get(getUrl('/forgot-password'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function forgotPasswordPost() {
  return http.post(getUrl('/forgot-password'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function resetPassword() {
  return http.post(getUrl('/reset-password'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function confirmPassword() {
  return http.post(getUrl('/confirm-password'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function verificationNotification() {
  return http.post(getUrl('/email/verification-notification'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}
