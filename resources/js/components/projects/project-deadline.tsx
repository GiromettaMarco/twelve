import format from '@/lib/format'
import { differenceInCalendarDays } from 'date-fns'
import { useLaravelReactI18n } from 'laravel-react-i18n'

// @TODO check date compatibility between js and php

export default function ProjectDeadline({ rawDeadline }: { rawDeadline?: string }) {
  // Setup translations
  const { currentLocale, t, tChoice } = useLaravelReactI18n()

  if (!rawDeadline) {
    return null
  }

  // const deadline = project.deadline ? new Date(project.deadline) : null
  const deadline = new Date(rawDeadline)
  // const deadline = new Date(2025, 4, 26)
  const deadlineCountdown = deadline ? differenceInCalendarDays(deadline, new Date()) : 0

  return (
    <>
      {deadlineCountdown > 7 ? (
        <p>
          {t('Deadline')}: {format(deadline, currentLocale())}
        </p>
      ) : deadlineCountdown > 1 ? (
        <p className="text-yellow-500">{tChoice('Deadline in :n days', deadlineCountdown, { n: deadlineCountdown })}</p>
      ) : deadlineCountdown >= 0 ? (
        <p className="text-red-500">{tChoice('Deadline in :n days', deadlineCountdown)}</p>
      ) : (
        <p className="text-red-500">
          {tChoice('Deadline expired by :n days', deadlineCountdown * -1, { n: deadlineCountdown * -1 })}
        </p>
      )}
    </>
  )
}
