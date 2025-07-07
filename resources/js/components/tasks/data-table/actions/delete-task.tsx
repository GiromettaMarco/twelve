import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import type { Task } from '@/types/task'
import { router } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function DeleteTask({ task }: { task: Task }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  function onClick() {
    router.delete(route('tasks.destroy', { project: task.project_id, id: task.id }), {
      preserveScroll: true
    })
  }

  return <DropdownMenuItem onClick={onClick}>{t('Delete')}</DropdownMenuItem>
}
