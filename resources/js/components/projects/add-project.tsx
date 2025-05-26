import InputError from '@/components/input-error'
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
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Plus } from 'lucide-react'
import { useEffect, useState, type FormEventHandler } from 'react'

// @TODO use library for timezones, etc.
// @TODO update text and localization

type ProjectForm = {
  title: string
  description: string
  deadline: string
}

export default function AddProject() {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  const { data, setData, post, errors, processing } = useForm<Required<ProjectForm>>({
    title: '',
    description: '',
    deadline: ''
  })

  const [deadline, setDeadline] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (deadline) {
      setData(
        'deadline',
        `${deadline.getFullYear()}-${(deadline.getMonth() + 1 + '').padStart(2, '0')}-${deadline.getDate()}`
      )
    } else {
      setData('deadline', '')
    }

    // console.log(data.deadline)
  }, [deadline, setData])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('projects.store'), {
      preserveScroll: true
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-7"
        >
          <Plus />
          <div className="sr-only lg:not-sr-only">{t('Add :name', { name: tChoice('Project', 1) })}</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Project</DialogTitle>
          <DialogDescription>
            Integer sodales odio arcu. Pellentesque vestibulum nisl metus, sit amet egestas tellus maximus ac.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={submit}
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
              placeholder="Description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />

            <InputError message={errors.description} />
          </div>

          <div className="grid gap-2">
            <CalendarWide
              mode="single"
              fixedWeeks
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

          <DialogFooter className="sm:justify-start">
            <Button
              type="submit"
              disabled={processing}
            >
              Create
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
