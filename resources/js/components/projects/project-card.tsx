import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Project } from '@/types/project'
import type { Task } from '@/types/task'
import { differenceInCalendarDays, format } from 'date-fns'
import { useLaravelReactI18n } from 'laravel-react-i18n'
// import { it } from 'date-fns/locale'

// @TODO check date compatibility between js and php
// @TODO localize date @SEE https://date-fns.org/v4.1.0/docs/I18n

const countTasksWithStatus = function (tasks: Task[], status: string) {
  return tasks.filter(function (task) {
    return task.status.title === status
  }).length
}

const calcPercent = function (part: number, total: number) {
  return ((part / total) * 100).toFixed(2)
}

export default function ProjectCard({ project }: { project: Project }) {
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

  // const deadline = project.deadline ? new Date(project.deadline) : null
  const deadline = project.deadline ? new Date(2025, 4, 26) : null
  const deadlineCountdown = deadline ? differenceInCalendarDays(deadline, new Date()) : 0

  // console.log(deadlineCountdown, new Date(project.deadline), new Date())
  // console.log(project.deadline, new Date(), deadlineCountdown)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.text}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
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
      </CardContent>
      {deadline && (
        <CardFooter>
          {deadlineCountdown > 7 ? (
            <p>
              {t('Deadline')}: {format(deadline, 'PPP')}
            </p>
          ) : deadlineCountdown > 1 ? (
            <p className="text-yellow-500">{tChoice('Deadline in :n days', deadlineCountdown, { n: deadlineCountdown })}</p>
          ) : deadlineCountdown >= 0 ? (
            <p className="text-red-500">{tChoice('Deadline in :n days', deadlineCountdown)}</p>
          ) : (
            <p className="text-red-500">{tChoice('Deadline expired by :n days', deadlineCountdown * -1, { n: deadlineCountdown * -1 })}</p>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
