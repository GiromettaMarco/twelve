import { getUrl } from '@mocks/url'
import { http, HttpResponse } from 'msw'

export function showProject() {
  return http.get(getUrl('/dashboard/projects/:id'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function createProject() {
  return http.post(getUrl('/dashboard/projects'), async () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function deleteProject() {
  return http.delete(getUrl('/dashboard/projects/:id'), () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function reorderProjects() {
  return http.patch(getUrl('/dashboard/projects'), async () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function updateProjectInfo() {
  return http.patch(getUrl('/dashboard/projects/:id/info'), async () => {
    return new HttpResponse(null, { status: 200 })
  })
}

export function updateProjectDeadline() {
  return http.patch(getUrl('/dashboard/projects/:id/deadline'), async () => {
    return new HttpResponse(null, { status: 200 })
  })
}
