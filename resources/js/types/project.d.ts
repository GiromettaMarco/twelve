import type { Task } from '@/types/task'

export interface Project {
  id: number
  title: string
  archived: boolean
  created_at: string
  updated_at: string
  tasks: Task[]
}
