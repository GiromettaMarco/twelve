import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function showProject() {
  return http.get(getUrl('/dashboard/projects/:id'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function deleteProject() {
  return http.delete(getUrl('/dashboard/projects/:id'), () => {
    return HttpResponse.json(
      {
        component: 'projects/index',
        props: {
          errors: {},
          flash: { title: 'Project deleted', description: null, level: 'success' }
        },
        url: '/dashboard/projects'
      },
      { status: 200 }
    )
  })
}

export function createProject() {
  return http.post(getUrl('/dashboard/projects'), async () => {
    return new HttpResponse(null, { status: 200 })
  })
}
