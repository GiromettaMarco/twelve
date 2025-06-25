import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { usePermissions } from '@/hooks/use-permissions'
import type { NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { ChartColumn, LayoutGrid, Stars, Users } from 'lucide-react'
import AppLogo from './app-logo'

export function AppSidebar() {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  // Collect permissions
  const permissions = usePermissions()

  const mainNavItems: NavItem[] = [
    {
      title: t('Dashboard'),
      href: route('dashboard'),
      icon: LayoutGrid,
      selected: route().current('dashboard')
    },
    {
      title: tChoice('User', 2),
      href: route('users.index'),
      icon: Users,
      selected: route().current('users.index')
    },
    {
      title: tChoice('Project', 2),
      href: route('projects.index'),
      icon: ChartColumn,
      selected: route().current('projects.*')
    }
  ]

  const footerNavItems: NavItem[] = permissions.telescope
    ? [
        {
          title: t('Telescope'),
          href: route('telescope'),
          icon: Stars
        }
      ]
    : []

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link
                href="/dashboard"
                prefetch
              >
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter
          items={footerNavItems}
          className="mt-auto"
        />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
