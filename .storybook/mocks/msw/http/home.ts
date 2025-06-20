import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function home() {
  return http.get(getUrl(), () => {
    return new HttpResponse(null, { status: 200 })
  })
}
