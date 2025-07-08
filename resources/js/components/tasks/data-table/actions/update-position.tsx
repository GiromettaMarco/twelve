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
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import type { Task } from '@/types/task'
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import type { FormEventHandler } from 'react'

interface UpdatePositionProps {
  task: Task
  max: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdatePosition({ task, max, open, setOpen }: UpdatePositionProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const { data, setData, patch, errors, processing, reset } = useForm<Required<{ position: number }>>({
    position: task.position
  })

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('tasks.updatePosition', { project: task.project_id, id: task.id }), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>{t('Reorder')}</DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Change the task position')}</DialogTitle>

          <DialogDescription>{t('Other tasks will be reordered accordingly.')}</DialogDescription>
        </DialogHeader>

        <form
          id="update-task-position-form"
          onSubmit={onSubmit}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="task-position">
              {t('Position')} ({data.position})
            </Label>

            <Slider
              id="task-position"
              defaultValue={[data.position]}
              min={0}
              max={max}
              step={1}
              form="update-task-position-form"
              onValueChange={(value) => setData('position', value[0])}
              className="mt-1"
            />

            <InputError message={errors.position} />
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
