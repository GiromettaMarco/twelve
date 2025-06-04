import AppFlash from '@/components/app-flash'
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout'
import { type BreadcrumbItem } from '@/types'
import { type ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  headerChildren?: ReactNode
}

export default ({ children, breadcrumbs, headerChildren, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate
    breadcrumbs={breadcrumbs}
    headerChildren={headerChildren}
    {...props}
  >
    {children}
    <AppFlash />
  </AppLayoutTemplate>
)
