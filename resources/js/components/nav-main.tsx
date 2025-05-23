import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { type NavItem } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export function NavMain({ items = [] }: { items: NavItem[] }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const page = usePage()

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>{t('Platform')}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={t(item.title)}>
            <SidebarMenuButton
              asChild
              isActive={item.href === page.url}
              tooltip={{ children: item.title }}
            >
              <Link
                href={item.href}
                prefetch
              >
                {item.icon && <item.icon />}
                <span>{t(item.title)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
