import { Breadcrumbs } from '@/components/breadcrumbs'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { type BreadcrumbItem } from '@/types'
import { type ReactNode } from 'react'

interface AppSidebarHeaderProps {
  children?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export function AppDashboardHeader({ children, breadcrumbs = [] }: AppSidebarHeaderProps) {
  return (
    <header className="border-sidebar-border/50 flex shrink-0 items-center gap-2 border-b px-6 py-4.5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        {children}
      </div>
    </header>
  )
}
