import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import type { FormEventHandler } from 'react'

interface EditProjectInfoProps {
  id: number
  title: string
  description?: string
}

type InfoForm = {
  title: string
  description: string
}

export default function EditProjectInfo({ id, title, description }: EditProjectInfoProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<InfoForm>>({
    title: title,
    description: description || ''
  })

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('projects.updateInfo', id), {
      preserveScroll: true
    })
  }

  return (
    <Card className="space-y-6 border-0">
      <CardContent>
        <form
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="title">{t('Title')}</Label>

            <Input
              id="title"
              className="mt-1 block w-full"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              required
              autoComplete="title"
              placeholder={t('Project title')}
            />

            <InputError
              className="mt-2"
              message={errors.title}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">{t('Description')}</Label>

            <Textarea
              id="project-description"
              className="mt-1 block w-full"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder={t('Project description')}
            />

            <InputError
              className="mt-2"
              message={errors.description}
            />
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
      </CardContent>
    </Card>
  )
}
