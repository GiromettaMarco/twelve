import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Stars } from 'lucide-react'

export function Filler1() {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <Card className={'bg-reading-back gap-4'}>
      <CardHeader className="flex-none">
        <CardTitle className="flex gap-4 align-middle">
          <Stars className="size-6" />
          <h4 className="text-base">{t('Filler 1')}</h4>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-reading-front flex-1">
        <p>
          Adipisci repellendus ratione laudantium nisi eaque voluptatem fuga quod hic, explicabo amet at laborum maiores
          ducimus et a vel quidem dolorem modi.
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

export function Filler2() {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <Card className={'bg-reading-back gap-4'}>
      <CardHeader className="flex-none">
        <CardTitle className="flex gap-4 align-middle">
          <Stars className="size-6" />
          <h4 className="text-base">{t('Filler 2')}</h4>
        </CardTitle>
      </CardHeader>

      <CardContent className="text-reading-front flex-1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda modi inventore, totam vero consequuntur,
          aut animi veritatis tempora nulla facere placeat velit illum explicabo dicta enim ipsum. Vitae ducimus,
          ratione.
        </p>
        <p className="mt-2">Vitae est numquam, dolore, ipsum tempora molestiae.</p>
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
