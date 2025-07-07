import EditProjectDeadline from '@/components/projects/edit-deadline'
import EditProjectInfo from '@/components/projects/edit-info'
import ShowProjectStats from '@/components/projects/show-stats'
import AddTask from '@/components/tasks/add-task'
import { useTaskColumns } from '@/components/tasks/data-table/use-task-columns'
import { TasksDataTable } from '@/components/tasks/tasks-data-table'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import type { Project } from '@/types/project'
import type { Label, Priority, Status } from '@/types/task'
import { Head } from '@inertiajs/react'
import { Separator } from '@radix-ui/react-separator'
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface ProjectPageProps {
  project: Project
  labels: Label[]
  statuses: Status[]
  priorities: Priority[]
}

export default function Project({ project, labels, statuses, priorities }: ProjectPageProps) {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('Dashboard'),
      href: route('dashboard')
    },
    {
      title: tChoice('Project', 2),
      href: route('projects.index')
    },
    {
      title: project.title,
      href: route('projects.show', project.id)
    }
  ]

  const columns = useTaskColumns({
    labels,
    statuses,
    priorities,
    totalTasks: project.tasks.length
  })

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      headerChildren={AddTask({ projectId: project.id, labels, statuses, priorities, count: project.tasks.length })}
    >
      <Head title="Projects" />

      <div className="rounded-xl p-4">
        <div className="relative flex-1 rounded-xl md:min-h-min">
          <TasksDataTable
            data={project.tasks}
            columns={columns.columnDef}
            statuses={statuses}
            priorities={priorities}
          />
        </div>

        <Separator className="bg-border my-4 h-px" />

        <section className="grid flex-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          <EditProjectInfo
            id={project.id}
            title={project.title}
            description={project.description}
          />

          <EditProjectDeadline
            id={project.id}
            rawDeadline={project.deadline}
          />

          <ShowProjectStats tasks={project.tasks} />
        </section>
      </div>
    </AppLayout>
  )
}
