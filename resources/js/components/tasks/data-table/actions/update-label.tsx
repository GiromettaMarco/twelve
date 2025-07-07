import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import type { Label, Task } from '@/types/task'
import { router } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function UpdateLabel({ task, labels }: { task: Task; labels: Label[] }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  function onClick(id: number | null) {
    router.patch(
      route('tasks.updateLabel', { project: task.project_id, id: task.id }),
      { label_id: id },
      { preserveScroll: true }
    )
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t('Label')}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={task.label?.value}>
          <DropdownMenuRadioItem
            value=""
            onClick={() => onClick(null)}
          >
            <span className="text-muted-foreground">{t('clear')}</span>
          </DropdownMenuRadioItem>
          {labels.map((label) => (
            <DropdownMenuRadioItem
              key={label.value}
              value={label.value}
              onClick={() => onClick(label.id)}
            >
              {label.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
