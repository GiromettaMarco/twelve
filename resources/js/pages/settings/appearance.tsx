import AppearanceTabs from '@/components/appearance-tabs'
import HeadingSmall from '@/components/heading-small'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings-layout'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Appearance() {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('Appearance settings'),
      href: route('appearance')
    }
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('Appearance settings')} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title={t('Appearance settings')}
            description={t("Update your account's appearance settings")}
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
