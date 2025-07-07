import PriorityLabel from '@/components/tasks/priority-label'
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import type { Priority, Task } from '@/types/task'
import { router } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function UpdatePriority({ task, priorities }: { task: Task; priorities: Priority[] }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  function onClick(id: number) {
    router.patch(
      route('tasks.updatePriority', { project: task.project_id, id: task.id }),
      { priority_id: id },
      { preserveScroll: true }
    )
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t('Priority')}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={task.status.value}>
          {priorities.map((priority) => (
            <DropdownMenuRadioItem
              key={priority.id}
              value={priority.value}
              onClick={() => onClick(priority.id)}
            >
              <PriorityLabel priority={priority} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
