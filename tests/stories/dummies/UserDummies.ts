import type { User } from '@/types'
import { projectDummy2, projectDummy3 } from '@stories/dummies/ProjectDummies'

export const userDummy1: User = {
  id: 1,
  name: 'Marco',
  email: 'girometta.marco@gmail.com',
  email_verified_at: '2025-06-14T13:58:10.000000Z',
  created_at: '2025-06-14T13:58:11.000000Z',
  updated_at: '2025-06-14T13:58:11.000000Z',
  language: 'system',
  projects: [projectDummy2, projectDummy3]
}
