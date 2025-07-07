import { url } from '@mocks/url'

type RawParameterValue = string | number

interface Route {
  uri: string
  methods: ('GET' | 'HEAD' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE')[]
  domain?: string
  parameters?: string[]
  bindings?: Record<string, string>
  wheres?: Record<string, unknown>
  middleware?: string[]
}

interface Config {
  url: string
  port: number | null
  defaults: Record<string, RawParameterValue>
  routes: Record<string, Route>
  location?: {
    host?: string
    pathname?: string
    search?: string
  }
}

export const Ziggy: Config = {
  url: url,
  port: null,
  defaults: {},
  routes: {
    'dusk.login': { uri: '_dusk/login/{userId}/{guard?}', methods: ['GET', 'HEAD'], parameters: ['userId', 'guard'] },
    'dusk.logout': { uri: '_dusk/logout/{guard?}', methods: ['GET', 'HEAD'], parameters: ['guard'] },
    'dusk.user': { uri: '_dusk/user/{guard?}', methods: ['GET', 'HEAD'], parameters: ['guard'] },
    telescope: { uri: 'telescope/{view?}', methods: ['GET', 'HEAD'], wheres: { view: '(.*)' }, parameters: ['view'] },
    home: { uri: '/', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    dashboard: { uri: 'dashboard', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'projects.index': {
      uri: 'dashboard/projects',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    'projects.show': {
      uri: 'dashboard/projects/{id}',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['id']
    },
    'projects.store': { uri: 'dashboard/projects', methods: ['POST'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'projects.destroy': {
      uri: 'dashboard/projects/{id}',
      methods: ['DELETE'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['id']
    },
    'projects.reorder': { uri: 'dashboard/projects', methods: ['PATCH'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'projects.updateInfo': {
      uri: 'dashboard/projects/{id}/info',
      methods: ['PATCH'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['id']
    },
    'projects.updateDeadline': {
      uri: 'dashboard/projects/{id}/deadline',
      methods: ['PATCH'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['id']
    },
    'tasks.store': {
      uri: 'dashboard/projects/{project}/tasks',
      methods: ['POST'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['project']
    },
    'tasks.destroy': {
      uri: 'dashboard/projects/{project}/tasks/{id}',
      methods: ['DELETE'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['project', 'id']
    },
    'tasks.updateLabel': {
      uri: 'dashboard/projects/{project}/tasks/{id}/label',
      methods: ['PATCH'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['project', 'id']
    },
    'tasks.updateStatus': {
      uri: 'dashboard/projects/{project}/tasks/{id}/status',
      methods: ['PATCH'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['project', 'id']
    },
    'tasks.updatePriority': {
      uri: 'dashboard/projects/{project}/tasks/{id}/priority',
      methods: ['PATCH'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['project', 'id']
    },
    'tasks.updatePosition': {
      uri: 'dashboard/projects/{project}/tasks/{id}/position',
      methods: ['PATCH'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['project', 'id']
    },
    'users.index': { uri: 'dashboard/users', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'profile.edit': { uri: 'settings/profile', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'profile.update': { uri: 'settings/profile', methods: ['PATCH'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'profile.destroy': { uri: 'settings/profile', methods: ['DELETE'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'password.edit': {
      uri: 'settings/password',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    'password.update': { uri: 'settings/password', methods: ['PUT'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    appearance: { uri: 'settings/appearance', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'language.edit': {
      uri: 'settings/language',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    'language.update': { uri: 'settings/language', methods: ['PATCH'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    register: { uri: 'register', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    login: { uri: 'login', methods: ['GET', 'HEAD'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'password.request': {
      uri: 'forgot-password',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    'password.email': { uri: 'forgot-password', methods: ['POST'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'password.reset': {
      uri: 'reset-password/{token}',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['token']
    },
    'password.store': { uri: 'reset-password', methods: ['POST'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'verification.notice': {
      uri: 'verify-email',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    'verification.verify': {
      uri: 'verify-email/{id}/{hash}',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' },
      parameters: ['id', 'hash']
    },
    'verification.send': {
      uri: 'email/verification-notification',
      methods: ['POST'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    'password.confirm': {
      uri: 'confirm-password',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+' }
    },
    logout: { uri: 'logout', methods: ['POST'], wheres: { id: '[0-9]+', project: '[0-9]+' } },
    'storage.local': {
      uri: 'storage/{path}',
      methods: ['GET', 'HEAD'],
      wheres: { id: '[0-9]+', project: '[0-9]+', path: '.*' },
      parameters: ['path']
    }
  }
}
