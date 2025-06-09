import format from '@/lib/format'
import { differenceInCalendarDays } from 'date-fns'
import { useLaravelReactI18n } from 'laravel-react-i18n'

// @TODO check date/time compatibility between js and php (timezones, etc)

export default function ProjectDeadline({ rawDeadline }: { rawDeadline?: string }) {
  // Setup translations
  const { currentLocale, t, tChoice } = useLaravelReactI18n()

  // Nothing to print
  if (!rawDeadline) {
    return null
  }

  const deadline = new Date(rawDeadline)

  // The date format is invalid
  if (isNaN(deadline.getTime())) {
    return null
  }

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
        <p className="text-red-600">{tChoice('Deadline in :n days', deadlineCountdown)}</p>
      ) : (
        <p className="text-destructive">
          {tChoice('Deadline expired by :n days', deadlineCountdown * -1, { n: deadlineCountdown * -1 })}
        </p>
      )}
    </>
  )
}
