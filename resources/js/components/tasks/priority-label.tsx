import { priorityIcons } from '@/components/tasks/data-table/data'
import { cn } from '@/lib/utils'
import type { Priority } from '@/types/task'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import type { ComponentProps } from 'react'

type PriorityLabelProps = ComponentProps<'div'> & {
  priority: Priority
}

export default function PriorityLabel({ priority, className, ...props }: PriorityLabelProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const Icon = priorityIcons[priority.value]

  return (
    <div
      className={cn('flex items-center', className)}
      {...props}
    >
      {Icon && <Icon className="text-muted-foreground mr-2 h-4 w-4" />}
      <span>{t(priority.label)}</span>
    </div>
  )
}
