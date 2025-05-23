import { columns } from '@/components/tasks/columns'
import { DataTable } from '@/components/tasks/data-table'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import type { Project } from '@/types/project'
import { Head } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Projects({ project }: { project: Project }) {
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

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable
            data={project.tasks}
            columns={columns}
          />
        </div>
      </div>
    </AppLayout>
  )
}
