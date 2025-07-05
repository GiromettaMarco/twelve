import InputError from '@/components/input-error'
import { Add } from '@/components/presets/add'
import { Button } from '@/components/ui/button'
import { CalendarWide } from '@/components/ui/calendar-wide'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDateForDB } from '@/lib/date-utils'
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { useEffect, useState, type FormEventHandler } from 'react'

type ProjectForm = {
  title: string
  description: string
  deadline: string
}

export default function AddProject() {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  const [open, setOpen] = useState(false)

  const { data, setData, post, errors, processing, reset } = useForm<Required<ProjectForm>>({
    title: '',
    description: '',
    deadline: ''
  })

  const [deadline, setDeadline] = useState<Date | undefined>(undefined)

  useEffect(() => {
    setData('deadline', deadline ? formatDateForDB(deadline) : '')
  }, [deadline, setData])

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('projects.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setOpen(false)
        setDeadline(undefined)
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Add label={t('Add :name', { name: tChoice('Project', 1) })} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Create a new Project')}</DialogTitle>

          <DialogDescription>
            {t(
              'Insert the project title and an optional short description. You may also choose a deadline from the calendar.'
            )}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Input
              type="text"
              id="project-title"
              placeholder={t('Title')}
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />

            <InputError message={errors.title} />
          </div>

          <div className="grid gap-2">
            <Textarea
              id="project-description"
              placeholder={t('Project description')}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />

            <InputError message={errors.description} />
          </div>

          <div className="grid gap-2">
            <CalendarWide
              mode="single"
              fixedWeeks
              showYearSwitcher={false}
              selected={deadline}
              onSelect={setDeadline}
              className="w-full rounded-md border"
            />

            <InputError message={errors.deadline} />

            <input
              type="date"
              value={data.deadline}
              readOnly
              hidden
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">{t('Cancel')}</Button>
            </DialogClose>

            <Button
              disabled={processing}
              asChild
            >
              <button type="submit">{t('Create')}</button>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
