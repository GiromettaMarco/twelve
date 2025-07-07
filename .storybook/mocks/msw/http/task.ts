import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function taskAll() {
  return http.all(getUrl('/dashboard/projects/:project/tasks/*'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}
