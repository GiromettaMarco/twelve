import type { SharedData } from '@/types'
import type { Page } from '@mocks/@inertiajs/core/types.mock'
import { getUrl } from '@mocks/url'
import { Ziggy } from '@mocks/ziggy/ziggy.mock'
import { userDummy1 } from '@stories/dummies/UserDummies'

export function newPageData(component?: string, location?: string): Page<SharedData> {
  return {
    component: component || '',
    props: {
      errors: {},
      name: 'Twelve',
      auth: {
        user: userDummy1,
        permissions: {
          telescope: true
        }
      },
      ziggy: {
        url: Ziggy.url,
        port: Ziggy.port,
        defaults: Ziggy.defaults,
        routes: Ziggy.routes,
        location: getUrl(location)
      },
      sidebarOpen: true,
      flash: {
        title: null,
        description: null,
        level: null
      }
    },
    url: location || '',
    version: null,
    clearHistory: false,
    encryptHistory: false,
    rememberedState: {}
  }
}

export default function usePage(): Page<SharedData> {
  return newPageData()
}
