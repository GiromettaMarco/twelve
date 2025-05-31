import { SidebarProvider } from '@/components/ui/sidebar'
import { getSidebarCookie } from '@/lib/sidebar-cookie'
import { SharedData } from '@/types'
import { usePage } from '@inertiajs/react'

interface AppShellProps {
  children: React.ReactNode
  variant?: 'header' | 'sidebar'
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
  // Receive server-side sidebar state (provided by inertia, extracted from request cookie)
  const isOpenServerSide = usePage<SharedData>().props.sidebarOpen

  // Get sidebar state client-side (from local cookie)
  const isOpenClientSide = getSidebarCookie()

  // If set use client-side state. Use server-side state otherwise.
  const isOpen = isOpenClientSide ?? isOpenServerSide

  if (variant === 'header') {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>
  }

  return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>
}
