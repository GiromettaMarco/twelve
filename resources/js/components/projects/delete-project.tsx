import { DeleteSmall } from '@/components/presets/delete-small'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { type FormEventHandler } from 'react'

export function DeleteProject({ id }: { id: number }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const { delete: destroy, processing } = useForm()

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    destroy(route('projects.destroy', { id }), {
      preserveScroll: true
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DeleteSmall label={t('Delete')} />
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>{t('Are you sure you want to delete this project?')}</DialogTitle>

        <DialogDescription>
          {t('Once the project is deleted, all related tasks will also be permanently deleted.')}
        </DialogDescription>

        <form
          onSubmit={submit}
          className="space-y-6"
        >
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">{t('Cancel')}</Button>
            </DialogClose>

            <Button
              variant="destructive"
              disabled={processing}
              asChild
            >
              <button type="submit">{t('Delete')}</button>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
