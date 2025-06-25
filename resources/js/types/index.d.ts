import type { Permission } from '@/types/permission'
import type { Project } from '@/types/project'
import { LucideIcon } from 'lucide-react'

interface Ziggy {
  url: string
  port: number | null
  defaults: Record<string, RawParameterValue>
  routes: Record<string, Route>
  location: string
}

export interface Flash {
  title: string | null
  description: string | null
  level: 'success' | 'info' | 'warning' | 'error' | null
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  projects?: Project[]
  permissions?: Permission[]
  [key: string]: unknown
}

export interface Permissions {
  telescope: boolean
  users: {
    view: boolean
  }
  [key: string]: unknown
}

export interface Auth {
  user: User | null
  permissions: Permissions
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon | null
  isActive?: boolean
  selected?: boolean
}

export interface SharedData {
  name: string
  auth: Auth
  ziggy: Ziggy
  sidebarOpen: boolean
  flash: Flash
  [key: string]: unknown
}
