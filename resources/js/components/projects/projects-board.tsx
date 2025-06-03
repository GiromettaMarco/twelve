import ProjectOverlay from '@/components/projects/project-overlay'
import SortableProject from '@/components/projects/sortable-project'
import type { Project } from '@/types/project'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'

export default function ProjectsBoard({ projects = [] }: { projects: Project[] }) {
  function getDraggedProject(id: string | number) {
    return projects.find((project) => project.id === id)
  }

  return (
    <div className="flex w-full flex-wrap gap-4">
      <DragDropProvider>
        {projects.map((project, index) => (
          <SortableProject
            index={index}
            key={project.id}
            project={project}
          />
        ))}

        <DragOverlay>
          {(source) => (
            <ProjectOverlay
              isDragging={source.isDragging}
              project={getDraggedProject(source.id)}
            />
          )}
        </DragOverlay>
      </DragDropProvider>
    </div>
  )
}
