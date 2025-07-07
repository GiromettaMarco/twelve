import InputError from '@/components/input-error'
import { Add } from '@/components/presets/add'
import PriorityLabel from '@/components/tasks/priority-label'
import StatusLabel from '@/components/tasks/status-label'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { Priority, Status, Label as TaskLabel } from '@/types/task'
import { useForm } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { CircleX } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'

interface AddTaskProps {
  projectId: number
  labels: TaskLabel[]
  statuses: Status[]
  priorities: Priority[]

  /** Number of tasks already present */
  count: number
}

type TaskForm = {
  title: string
  position: number
  description: string
  label_id: number | null
  status_id: number
  priority_id: number
}

export default function AddTask({ projectId, labels, statuses, priorities, count }: AddTaskProps) {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  const [open, setOpen] = useState(false)

  const { data, setData, post, errors, processing, reset } = useForm<Required<TaskForm>>({
    title: '',
    position: 0,
    description: '',
    label_id: null,
    status_id: 2,
    priority_id: 2
  })

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('tasks.store', { project: projectId }), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setOpen(false)
      }
    })
  }

  const [labelSelectValue, setLabelSelectValue] = useState(data.label_id?.toString() || '')

  function changeLabel(value: string) {
    setLabelSelectValue(value)

    setData('label_id', parseInt(value))
  }

  function clearLabel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    setLabelSelectValue('')

    setData('label_id', null)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Add label={t('Add :name', { name: tChoice('Task', 1) })} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Create a new Task')}</DialogTitle>

          <DialogDescription>{t('Insert the task title and other optional fields.')}</DialogDescription>
        </DialogHeader>

        <form
          id="new-task-form"
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
            <Label htmlFor="task-position">
              {t('Position')} ({data.position})
            </Label>

            <Slider
              id="task-position"
              defaultValue={[data.position]}
              min={0}
              max={count}
              step={1}
              form="new-task-form"
              onValueChange={(value) => setData('position', value[0])}
              className="mt-1"
            />

            <InputError message={errors.position} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-description">{t('Description')}</Label>

            <Textarea
              id="task-description"
              placeholder={t('Task description')}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />

            <InputError message={errors.description} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-label">{t('Label')}</Label>

            <div className="flex items-center gap-4">
              <Select
                value={labelSelectValue}
                onValueChange={changeLabel}
              >
                <SelectTrigger
                  id="task-label"
                  className="w-56"
                >
                  <SelectValue placeholder={t('Task label')} />
                </SelectTrigger>
                <SelectContent>
                  {labels.map((label) => (
                    <SelectItem
                      key={label.id}
                      value={label.id.toString()}
                    >
                      {t(label.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="default"
                    variant="outline"
                    onClick={clearLabel}
                    aria-label={t('Clear selection')}
                    className="transition-colors hover:text-red-600 focus-visible:text-red-600"
                  >
                    <CircleX className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('Clear selection')}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <InputError message={errors.label_id} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-status">{t('Status')}</Label>

            <Select
              defaultValue={data.status_id.toString()}
              onValueChange={(value) => setData('status_id', parseInt(value))}
            >
              <SelectTrigger
                id="task-status"
                className="w-56"
              >
                <SelectValue placeholder={t('Task status')} />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem
                    key={status.id}
                    value={status.id.toString()}
                  >
                    <StatusLabel status={status} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputError message={errors.status_id} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="task-priority">{t('Priority')}</Label>

            <Select
              defaultValue={data.priority_id.toString()}
              onValueChange={(value) => setData('priority_id', parseInt(value))}
            >
              <SelectTrigger
                id="task-priority"
                className="w-56"
              >
                <SelectValue placeholder={t('Task priority')} />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem
                    key={priority.id}
                    value={priority.id.toString()}
                  >
                    <PriorityLabel priority={priority} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <InputError message={errors.priority_id} />
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
