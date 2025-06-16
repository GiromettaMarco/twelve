import { AppContent } from '@/components/app-content'
import { AppDashboardHeader } from '@/components/app-dashboard-header'
import { AppShell } from '@/components/app-shell'
import { AppSidebar } from '@/components/app-sidebar'
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
      <AppContent>
        <AppDashboardHeader
          breadcrumbs={breadcrumbs}
          children={headerChildren}
        />
        {children}
      </AppContent>
    </AppShell>
  )
}
