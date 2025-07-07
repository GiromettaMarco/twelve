import { priorityIcons } from '@/components/tasks/data-table/data'
import { cn } from '@/lib/utils'
import type { Status } from '@/types/task'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import type { ComponentProps } from 'react'

type StatusLabelProps = ComponentProps<'div'> & {
  status: Status
}

export default function StatusLabel({ status, className, ...props }: StatusLabelProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const Icon = priorityIcons[status.value]

  return (
    <div
      className={cn('flex items-center', className)}
      {...props}
    >
      {Icon && <Icon className="text-muted-foreground mr-2 h-4 w-4" />}
      <span>{t(status.label)}</span>
    </div>
  )
}
