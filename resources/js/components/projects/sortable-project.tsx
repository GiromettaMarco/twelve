import { EditSmall } from '@/components/presets/edit-small'
import { Move } from '@/components/presets/move'
import { DeleteProject } from '@/components/projects/delete-project'
import ProjectDeadline from '@/components/projects/project-deadline'
import ProjectStats from '@/components/projects/project-stats'
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
      className={
        'w-full flex-none gap-4 transition-opacity md:w-[28rem] 2xl:w-[31.25rem]' +
        (isDragging ? ' pointer-events-none opacity-0' : '')
      }
    >
      <CardHeader>
        <Link href={href}>
          <CardTitle className="md:truncate md:leading-[1.5rem]">{project.title}</CardTitle>
        </Link>

        <CardDescription className="mt-2 md:h-5 md:truncate">{project.description}</CardDescription>

        <CardAction>
          <Move
            ref={handleRef}
            label={t('Move')}
          />
        </CardAction>
      </CardHeader>

      <CardContent>
        <ProjectStats project={project} />
      </CardContent>

      <CardFooter>
        <div className="flex w-full justify-between">
          <ProjectDeadline rawDeadline={project.deadline} />

          <div className="flex flex-auto justify-end gap-0.5">
            <EditSmall
              href={href}
              label={t('Edit')}
            />
            <DeleteProject id={project.id} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
