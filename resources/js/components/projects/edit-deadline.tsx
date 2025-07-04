import ProjectDeadline from '@/components/projects/project-deadline'
import { Button } from '@/components/ui/button'
import { CalendarWide } from '@/components/ui/calendar-wide'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatDateForDB } from '@/lib/date-utils'
import { router } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { CalendarX } from 'lucide-react'
import { useState } from 'react'

interface EditProjectDeadlineProps {
  id: number
  rawDeadline?: string
}

export default function EditProjectDeadline({ id, rawDeadline }: EditProjectDeadlineProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const [deadline, setDeadline] = useState<Date | undefined>(rawDeadline ? new Date(rawDeadline) : undefined)

  function updateRemoteDeadline(deadline?: string) {
    router.patch(
      route('projects.updateDeadline', id),
      {
        deadline: deadline
      },
      {
        preserveScroll: true
      }
    )
  }

  function onSelectHandler(date?: Date) {
    setDeadline(date)

    updateRemoteDeadline(date ? formatDateForDB(date) : undefined)
  }

  function removeDeadline() {
    setDeadline(undefined)

    updateRemoteDeadline(undefined)
  }

  return (
    <Card className="gap-2 border-0">
      <CardHeader>
        <CardTitle className="md:leading-[1.5rem]">{t('Deadline')}</CardTitle>

        <CardDescription>{t('Set the project deadline')}</CardDescription>

        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={removeDeadline}
                aria-label={t('remove deadline')}
                className="transition-colors hover:text-red-600 focus-visible:text-red-600"
              >
                <CalendarX className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('remove deadline')}</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>

      <CardContent>
        <CalendarWide
          mode="single"
          fixedWeeks
          showYearSwitcher={false}
          selected={deadline}
          onSelect={onSelectHandler}
        />
      </CardContent>

      <CardFooter>
        <ProjectDeadline rawDeadline={rawDeadline} />
      </CardFooter>
    </Card>
  )
}
