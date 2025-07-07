import StatusLabel from '@/components/tasks/status-label'
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import type { Status, Task } from '@/types/task'
import { router } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function UpdateStatus({ task, statuses }: { task: Task; statuses: Status[] }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  function onClick(id: number) {
    router.patch(
      route('tasks.updateStatus', { project: task.project_id, id: task.id }),
      { status_id: id },
      { preserveScroll: true }
    )
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t('Status')}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={task.status.value}>
          {statuses.map((status) => (
            <DropdownMenuRadioItem
              key={status.id}
              value={status.value}
              onClick={() => onClick(status.id)}
            >
              <StatusLabel status={status} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
