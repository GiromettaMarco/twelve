import type { ProjectStatsProps } from '@/components/projects/project-stats'
import ProjectStats from '@/components/projects/project-stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function ShowProjectStats({ project, className }: ProjectStatsProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <Card className="border-0">
      <CardHeader className="flex-none">
        <CardTitle className="md:leading-[1.5rem]">{t('Statistics')}</CardTitle>
        <CardDescription>{t('Task usage statistics')}</CardDescription>
      </CardHeader>

      <CardContent>
        <ProjectStats
          project={project}
          className={className}
        />
      </CardContent>
    </Card>
  )
}
