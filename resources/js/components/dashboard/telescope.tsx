import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Stars } from 'lucide-react'

export default function Telescope() {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <Card className={'bg-reading-back gap-4'}>
      <CardHeader className="flex-none">
        <CardTitle className="flex gap-4 align-middle">
          <Stars className="size-6" />
          <h4 className="text-base">{t('Telescope')}</h4>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-reading-front flex-1">
        <p>
          {t(
            'Provide insight into the requests coming into the application, exceptions, log entries, database queries, queued jobs, mail, notifications, cache operations, scheduled tasks, variable dumps, and more.'
          )}
        </p>
      </CardContent>

      <CardFooter className="flex flex-none flex-row-reverse">
        <Button asChild>
          <a
            href={route('telescope')}
            target="_blank"
          >
            {t('Open')}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
