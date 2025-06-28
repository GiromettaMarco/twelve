import type { Task } from '@/types/task'

export interface Project {
  id: number
  title: string
  description?: string
  archived: boolean
  deadline?: string
  created_at: string
  updated_at: string
  tasks: Task[]
  pivot: {
    position: number
    role: string
  }
}
