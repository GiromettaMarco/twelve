import ProjectDeadline from '@/components/projects/project-deadline'
import ProjectStats from '@/components/projects/project-stats'
import CardStandard from '@/components/ui/card-standard'
import type { Project } from '@/types/project'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <CardStandard
      title={project.title}
      href={route('projects.show', { id: project.id })}
      description={project.text}
      content={ProjectStats({ project: project })}
      footer={ProjectDeadline({ rawDeadline: project.deadline })}
    />
  )
}
