import TasksStats from '@/components/tasks/tasks-stats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Task } from '@/types/task'
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface ProjectStatsProps {
  tasks: Task[]
  className?: string
}

export default function ShowProjectStats({ tasks, className }: ProjectStatsProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <Card className="border-0">
      <CardHeader className="flex-none">
        <CardTitle className="md:leading-[1.5rem]">{t('Statistics')}</CardTitle>
        <CardDescription>{t('Task usage statistics')}</CardDescription>
      </CardHeader>

      <CardContent>
        <TasksStats
          tasks={tasks}
          className={className}
        />
      </CardContent>
    </Card>
  )
}
