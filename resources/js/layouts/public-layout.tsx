import { Login } from '@/components/presets/login'
import App from '@/providers/app'
import type { SharedData } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { type ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  title: string
}

export default function ({ children, title }: AppLayoutProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const { auth } = usePage<SharedData>().props

  return (
    <App>
      <Head title={title}>
        <link
          rel="preconnect"
          href="https://fonts.bunny.net"
        />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      <div className="flex min-h-screen flex-col items-center bg-neutral-50 p-6 text-neutral-950 lg:justify-center lg:p-8 dark:bg-neutral-950 dark:text-neutral-50">
        <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
          <nav className="flex items-center justify-end gap-4">
            {auth.user ? (
              <Login href={route('dashboard')}>{t('Dashboard')}</Login>
            ) : (
              <>
                <Login
                  href={route('login')}
                  variant="borderless"
                >
                  {t('Log in')}
                </Login>
                <Login href={route('register')}>{t('Register')}</Login>
              </>
            )}
          </nav>
        </header>

        <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
          <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">{children}</main>
        </div>

        <div className="hidden h-14.5 lg:block"></div>
      </div>
    </App>
  )
}
