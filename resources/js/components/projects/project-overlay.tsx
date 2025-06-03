import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Project } from '@/types/project'
import { GripVertical } from 'lucide-react'

export default function ProjectOverlay({ project, isDragging = true }: { project?: Project; isDragging?: boolean }) {
  return (
    <Card className={'transition-shadow dark:shadow-gray-700' + (isDragging ? ' shadow-2xl' : '')}>
      <CardHeader>
        <CardTitle className="md:truncate md:leading-[1.5rem]">{project?.title}</CardTitle>
        <CardDescription className="mt-2 truncate md:h-5">{project?.description}</CardDescription>
        <CardAction>
          <GripVertical className="size-8" />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
