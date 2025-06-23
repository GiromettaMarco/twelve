import { AppContent } from '@/components/app-content'
import { AppDashboardHeader } from '@/components/app-dashboard-header'
import AppFlash from '@/components/app-flash'
import { AppShell } from '@/components/app-shell'
import { AppSidebar } from '@/components/app-sidebar'
import { type BreadcrumbItem } from '@/types'
import { type ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  headerChildren?: ReactNode
}

export default function ({ children, breadcrumbs, headerChildren }: AppLayoutProps) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent>
        <AppDashboardHeader
          breadcrumbs={breadcrumbs}
          children={headerChildren}
        />
        {children}
        <AppFlash />
      </AppContent>
    </AppShell>
  )
}
