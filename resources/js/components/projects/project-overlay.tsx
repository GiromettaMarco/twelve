import { Move } from '@/components/presets/move'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/types/project'

export default function ProjectOverlay({ project, isDragging = true }: { project?: Project; isDragging?: boolean }) {
  return (
    <Card className={'transition-shadow dark:shadow-gray-700' + (isDragging ? ' shadow-2xl' : '')}>
      <CardHeader>
        <CardTitle className="md:truncate md:leading-[1.5rem]">{project?.title}</CardTitle>
        <CardDescription className="mt-1 truncate">{project?.description}</CardDescription>
        <CardAction>
          <Move />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
