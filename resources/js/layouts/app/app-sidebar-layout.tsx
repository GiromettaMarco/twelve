import { AppContent } from '@/components/app-content'
import { AppShell } from '@/components/app-shell'
import { AppSidebar } from '@/components/app-sidebar'
import { AppSidebarHeader } from '@/components/app-sidebar-header'
import type { BreadcrumbItem } from '@/types'
import type { ReactNode } from 'react'

interface AppSidebarLayoutProps {
  children?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  headerChildren?: ReactNode
}

export default function AppSidebarLayout({ children, breadcrumbs = [], headerChildren }: AppSidebarLayoutProps) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} children={headerChildren} />
        {children}
      </AppContent>
    </AppShell>
  )
}
