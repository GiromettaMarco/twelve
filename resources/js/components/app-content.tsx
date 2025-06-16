import { SidebarInset } from '@/components/ui/sidebar'
import * as React from 'react'

interface AppContentProps extends React.ComponentProps<'main'> {
  variant?: 'header' | 'inset'
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
  if (variant === 'inset') {
    return <SidebarInset {...props}>{children}</SidebarInset>
  }

  return (
    <main
      className="container-with-sidebar mx-auto flex flex-1 flex-col gap-4 rounded-xl"
      {...props}
    >
      {children}
    </main>
  )
}
