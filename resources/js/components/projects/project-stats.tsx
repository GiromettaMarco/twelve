import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Project } from '@/types/project'
import type { Task } from '@/types/task'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export interface ProjectStatsProps {
  project: Project
  className?: string
}

const countTasksWithStatus = function (tasks: Task[], status: string) {
  return tasks.filter(function (task) {
    return task.status.title === status
  }).length
}

const calcPercent = function (part: number, total: number) {
  return total > 0 ? ((part / total) * 100).toFixed(2) : 0
}

export default function ProjectStats({ project, className }: ProjectStatsProps) {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  const totalTasks = project.tasks.length

  const doneTasks = countTasksWithStatus(project.tasks, 'done')
  const doneTasksPercent = calcPercent(doneTasks, totalTasks)

  const inProgressTasks = countTasksWithStatus(project.tasks, 'in progress')
  const inProgressTasksPercent = calcPercent(inProgressTasks, totalTasks)

  const todoTasks = countTasksWithStatus(project.tasks, 'todo')
  const todoTasksPercent = calcPercent(todoTasks, totalTasks)

  const backlogTasks = countTasksWithStatus(project.tasks, 'backlog')
  const backlogTasksPercent = calcPercent(backlogTasks, totalTasks)

  const cancelledTasks = countTasksWithStatus(project.tasks, 'cancelled')
  const cancelledTasksPercent = calcPercent(cancelledTasks, totalTasks)

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>{tChoice('Task', 2)}</TableHead>
          <TableHead className="text-right">{totalTasks}</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{t('Done')}</TableCell>
          <TableCell className="text-right">{doneTasks}</TableCell>
          <TableCell className="text-right">{doneTasksPercent} %</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('In Progress')}</TableCell>
          <TableCell className="text-right">{inProgressTasks}</TableCell>
          <TableCell className="text-right">{inProgressTasksPercent} %</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('Todo')}</TableCell>
          <TableCell className="text-right">{todoTasks}</TableCell>
          <TableCell className="text-right">{todoTasksPercent} %</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('Backlog')}</TableCell>
          <TableCell className="text-right">{backlogTasks}</TableCell>
          <TableCell className="text-right">{backlogTasksPercent} %</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">{t('Cancelled')}</TableCell>
          <TableCell className="text-right">{cancelledTasks}</TableCell>
          <TableCell className="text-right">{cancelledTasksPercent} %</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
