import PublicLayout from '@/layouts/public-layout'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Error404() {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <PublicLayout title={t('Page not found')}>
      <div>
        <h1 className="mb-1 text-xl font-bold">{t('Error 404 - Not found')}</h1>
        <p>{t("Sorry, we can't find what you're looking for")}</p>
      </div>
    </PublicLayout>
  )
}
