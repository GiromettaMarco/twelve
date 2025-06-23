import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, isWindow } from '@/lib/utils'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { KeyRound, Languages, SunMoon, User } from 'lucide-react'
import { type PropsWithChildren } from 'react'

export default function ({ children }: PropsWithChildren) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const sidebarNavItems: NavItem[] = [
    {
      title: t('Profile'),
      href: route('profile.edit'),
      icon: User
    },
    {
      title: t('Password'),
      href: route('password.edit'),
      icon: KeyRound
    },
    {
      title: t('Appearance'),
      href: route('appearance'),
      icon: SunMoon
    },
    {
      title: t('Language'),
      href: route('language.edit'),
      icon: Languages
    }
  ]

  const currentPath = isWindow() ? window.location.pathname : ''

  return (
    <div className="px-4 py-6">
      <Heading
        title={t('Settings')}
        description={t('Manage your profile and account settings')}
      />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col space-y-1 space-x-0">
            {sidebarNavItems.map((item, index) => (
              <Button
                key={`${item.href}-${index}`}
                size="sm"
                variant="ghost"
                asChild
                className={cn('w-full justify-start', {
                  'bg-muted': currentPath === item.href
                })}
              >
                <Link
                  href={item.href}
                  prefetch
                >
                  {item.icon && <item.icon />}
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        <Separator className="my-6 md:hidden" />

        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  )
}
