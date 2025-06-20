import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function dashboard() {
  return http.get(new RegExp(getUrl('/dashboard.*')), () => {
    return new HttpResponse(null, { status: 200 })
  })
}
