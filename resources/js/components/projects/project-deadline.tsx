import { format } from '@/lib/date-utils'
import { cn } from '@/lib/utils'
import { differenceInCalendarDays } from 'date-fns'
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface ProjectDeadlineProps {
  rawDeadline?: Date | string
  className?: string
}

export default function ProjectDeadline({ rawDeadline, className }: ProjectDeadlineProps) {
  // Setup translations
  const { currentLocale, t, tChoice } = useLaravelReactI18n()

  // Nothing to print
  if (!rawDeadline) {
    return null
  }

  // Parse date
  const deadline = rawDeadline instanceof Date ? rawDeadline : new Date(rawDeadline)

  // The date format is invalid
  if (isNaN(deadline.getTime())) {
    return null
  }

  const deadlineCountdown = deadline ? differenceInCalendarDays(deadline, new Date()) : 0

  return (
    <>
      {deadlineCountdown > 7 ? (
        <p className={className}>
          {t('Deadline')}: {format(deadline, currentLocale())}
        </p>
      ) : deadlineCountdown > 1 ? (
        <p className={cn('text-yellow-500', className)}>
          {tChoice('Deadline in :n days', deadlineCountdown, { n: deadlineCountdown })}
        </p>
      ) : deadlineCountdown >= 0 ? (
        <p className={cn('text-red-600', className)}>{tChoice('Deadline in :n days', deadlineCountdown)}</p>
      ) : (
        <p className={cn('text-destructive', className)}>
          {tChoice('Deadline expired by :n days', deadlineCountdown * -1, { n: deadlineCountdown * -1 })}
        </p>
      )}
    </>
  )
}
