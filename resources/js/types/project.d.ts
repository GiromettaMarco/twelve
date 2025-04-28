import type { Task } from '@/types/task'

export interface Project {
  id: number
  title: string
  text?: string
  archived: boolean
  deadline?: string
  created_at: string
  updated_at: string
  tasks: Task[]
}
