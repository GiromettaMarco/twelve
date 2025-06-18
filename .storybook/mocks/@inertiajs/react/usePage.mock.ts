import type { SharedData } from '@/types'
import type { Page } from '@mocks/@inertiajs/core/types.mock'
import { Ziggy } from '@mocks/ziggy/ziggy.mock'

export const defaultData: Page<SharedData> = {
  component: '',
  props: {
    errors: {},
    name: 'Twelve',
    auth: {
      user: {
        id: 1,
        name: 'Marco',
        email: 'girometta.marco@gmail.com',
        email_verified_at: '2025-06-14T13:58:10.000000Z',
        created_at: '2025-06-14T13:58:11.000000Z',
        updated_at: '2025-06-14T13:58:11.000000Z',
        language: 'system'
      }
    },
    ziggy: {
      url: Ziggy.url,
      port: Ziggy.port,
      defaults: Ziggy.defaults,
      routes: Ziggy.routes,
      location: ''
    },
    sidebarOpen: true,
    flash: {
      title: null,
      description: null,
      level: null
    }
  },
  url: '',
  version: null,
  clearHistory: false,
  encryptHistory: false,
  rememberedState: {}
}

export default function usePage(): Page<SharedData> {
  return defaultData
}
