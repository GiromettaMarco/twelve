import ProjectDeadline from '@/components/projects/project-deadline'
import ProjectStats from '@/components/projects/project-stats'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/types/project'
import { useSortable } from '@dnd-kit/react/sortable'
import { Link } from '@inertiajs/react'
import { GripVertical } from 'lucide-react'

export default function SortableProject({ project, index }: { project: Project; index: number }) {
  const { ref, handleRef, isDragging } = useSortable({ id: project.id, index })

  return (
    <Card
      ref={ref}
      className={
        'w-full flex-none gap-4 transition-opacity md:h-96 md:w-[28rem] 2xl:w-[31.25rem]' +
        (isDragging ? ' pointer-events-none opacity-0' : '')
      }
    >
      <CardHeader>
        <Link href={route('projects.show', { id: project.id })}>
          <CardTitle className="md:truncate md:leading-[1.5rem]">{project.title}</CardTitle>
        </Link>
        <CardDescription className="mt-2 md:h-5 md:truncate">{project.description}</CardDescription>
        <CardAction>
          <GripVertical
            ref={handleRef}
            className="size-8"
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ProjectStats project={project} />
      </CardContent>
      <CardFooter>
        <ProjectDeadline rawDeadline={project.deadline} />
      </CardFooter>
    </Card>
  )
}
