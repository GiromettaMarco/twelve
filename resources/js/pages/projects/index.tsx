import AddProject from '@/components/projects/add-project'
import ProjectsBoard from '@/components/projects/projects-board'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import type { Project } from '@/types/project'
import { Head } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Projects({ projects = [] }: { projects: Project[] }) {
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
    }
  ]

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      headerChildren={AddProject()}
    >
      <Head title={tChoice('Project', 2)} />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-4 md:px-0">
        <ProjectsBoard projects={projects} />
      </div>
    </AppLayout>
  )
}
