import { EditSmall } from '@/components/presets/edit-small'
import { Move } from '@/components/presets/move'
import { DeleteProject } from '@/components/projects/delete-project'
import ProjectDeadline from '@/components/projects/project-deadline'
import TasksStats from '@/components/tasks/tasks-stats'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/types/project'
import { useSortable } from '@dnd-kit/react/sortable'
import { Link } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function SortableProject({ project, index }: { project: Project; index: number }) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const { ref, handleRef, isDragging } = useSortable({ id: project.id, index })

  const href = route('projects.show', { id: project.id })

  return (
    <Card
      ref={ref}
      className={'gap-2 transition-opacity' + (isDragging ? ' pointer-events-none opacity-0' : '')}
    >
      <CardHeader className="flex-none">
        <Link href={href}>
          <CardTitle className="md:truncate md:leading-[1.5rem]">{project.title}</CardTitle>
        </Link>

        <CardDescription className="md:truncate">{project.description}</CardDescription>

        <CardAction>
          <Move
            ref={handleRef}
            label={t('Move')}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        <TasksStats tasks={project.tasks} />
      </CardContent>

      <CardFooter className="flex-none">
        <ProjectDeadline rawDeadline={project.deadline} />

        <div className="flex flex-auto justify-end gap-0.5">
          <EditSmall
            href={href}
            label={t('Edit')}
          />
          <DeleteProject id={project.id} />
        </div>
      </CardFooter>
    </Card>
  )
}
