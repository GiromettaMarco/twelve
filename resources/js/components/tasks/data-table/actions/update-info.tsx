import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
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
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Task } from '@/types/task'
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { useEffect, useState, type FormEventHandler } from 'react'

interface UpdateInfoProps {
  task: Task
  setParentMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface UpdateInfoForm {
  title: string
  description: string
}

interface ValidationErrors {
  title?: string
  description?: string
}

export default function UpdateInfo({ task, setParentMenuOpen }: UpdateInfoProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const [open, setOpen] = useState(false)

  const { data, setData, patch, processing, reset } = useForm<Required<UpdateInfoForm>>({
    title: task.title,
    description: task.description || ''
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (errors.title || errors.description) {
      return
    }

    patch(route('tasks.updateInfo', { project: task.project_id, id: task.id }), {
      preserveScroll: true,
      onSuccess: () => {
        reset()

        if (setParentMenuOpen) {
          setParentMenuOpen(open)
        }

        setOpen(false)
      }
    })
  }

  function onOpenChange(open: boolean) {
    setOpen(open)

    if (!open && setParentMenuOpen) {
      setParentMenuOpen(open)
    }
  }

  useEffect(() => {
    let titleError = undefined
    let descriptionError = undefined

    if (data.title === '') {
      titleError = t('The :attribute field is required.', { attribute: t('title') })
    } else if (data.title.length > 255) {
      titleError = t('The :attribute field must not be greater than :max characters.', {
        attribute: t('title'),
        max: 255
      })
    }

    if (data.description.length > 5000) {
      descriptionError = t('The :attribute field must not be greater than :max characters.', {
        attribute: t('description'),
        max: 5000
      })
    }

    setErrors({
      title: titleError,
      description: descriptionError
    })
  }, [t, data.title, data.description])

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>{t('Edit')}</DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Change the task info')}</DialogTitle>

          <DialogDescription>{t('Read and update title and description.')}</DialogDescription>
        </DialogHeader>

        <form
          id="update-task-info-form"
          onSubmit={onSubmit}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="task-title">{t('Title')}</Label>

            <Input
              type="text"
              id="task-title"
              placeholder={t('Task title')}
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />

            <InputError message={errors.title} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-description">{t('Description')}</Label>

            <Textarea
              id="task-description"
              placeholder={t('Task description')}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
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
              <button type="submit">{t('Save')}</button>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
