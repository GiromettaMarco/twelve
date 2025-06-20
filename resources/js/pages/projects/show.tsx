import ProjectDeadline from '@/components/projects/project-deadline'
import ProjectStats from '@/components/projects/project-stats'
import { TasksDataTable } from '@/components/tasks/tasks-data-table'
import { useTaskColumns } from '@/components/tasks/use-task-columns'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import type { Project } from '@/types/project'
import { Head } from '@inertiajs/react'
import { Separator } from '@radix-ui/react-separator'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Project({ project }: { project: Project }) {
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

  const columns = useTaskColumns()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="rounded-xl p-4">
        <div className="relative flex-1 overflow-hidden rounded-xl md:min-h-min">
          <TasksDataTable
            data={project.tasks}
            columns={columns.columnDef}
          />
        </div>

        <Separator className="bg-border my-4 h-px" />

        <div className="grid flex-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
          <ProjectStats project={project} />
          {project.description && <div>{<p>{project.description}</p>}</div>}
          {project.deadline && <div>{ProjectDeadline({ rawDeadline: project.deadline })}</div>}
        </div>
      </div>
    </AppLayout>
  )
}
