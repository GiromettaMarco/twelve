import HeadingSmall from '@/components/heading-small'
import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { type BreadcrumbItem } from '@/types'
import { Transition } from '@headlessui/react'
import { Head, useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { useEffect, type FormEventHandler } from 'react'

type LanguageForm = {
  language: string
}

export default function Language({ language = 'system' }: { language: string }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('Language settings'),
      href: route('language.edit')
    }
  ]

  const { data, setData, patch, errors, processing, recentlySuccessful, wasSuccessful } = useForm<Required<LanguageForm>>({
    language: language
  })

  useEffect(() => {
    if (wasSuccessful) {
      window.location.reload()
    }
  }, [wasSuccessful])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('language.update'), {
      preserveScroll: true
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('Language settings')} />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title={t('Language settings')} description={t("Update your account's language settings")} />

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
              <Select value={data.language} onValueChange={(newLangTag) => setData('language', newLangTag)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('Language')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">{t('System')}</SelectItem>
                  <SelectItem value="en">{t('English')}</SelectItem>
                  <SelectItem value="it">{t('Italian')}</SelectItem>
                </SelectContent>
              </Select>

              <InputError className="mt-2" message={errors.language} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>{t('Save')}</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">{t('Saved')}</p>
              </Transition>
            </div>
          </form>
        </div>
      </SettingsLayout>
    </AppLayout>
  )
}
