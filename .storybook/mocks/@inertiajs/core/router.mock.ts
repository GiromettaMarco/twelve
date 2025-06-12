import axios from 'axios'
import type { RequestPayload, VisitHelperOptions, VisitOptions } from './types.mock'

interface Router {
  visit: (href: string, options: VisitOptions<RequestPayload>) => void
  get: (url: string, data: RequestPayload, options: VisitHelperOptions<RequestPayload>) => void
  post: (url: string, data: RequestPayload, options: VisitHelperOptions<RequestPayload>) => void
  put: (url: string, data: RequestPayload, options: VisitHelperOptions<RequestPayload>) => void
  patch: (url: string, data: RequestPayload, options: VisitHelperOptions<RequestPayload>) => void
  delete: (url: string, options: Omit<VisitOptions<RequestPayload>, 'method'>) => void
}

export const router: Router = {
  visit(href, options = {}) {
    console.log('[router mockup] visiting', href, options)

    axios({
      method: options.method,
      url: href,
      data: options.data,
      headers: options.headers,
      responseType: 'text'
    })
  },

  get(url, data = {}, options = {}) {
    this.visit(url, { ...options, method: 'get', data })
  },

  post(url, data = {}, options = {}) {
    this.visit(url, { preserveState: true, ...options, method: 'post', data })
  },

  put(url, data = {}, options = {}) {
    this.visit(url, { preserveState: true, ...options, method: 'put', data })
  },

  patch(url, data = {}, options = {}) {
    this.visit(url, { preserveState: true, ...options, method: 'patch', data })
  },

  delete(url, options = {}) {
    this.visit(url, { preserveState: true, ...options, method: 'delete' })
  }
}
