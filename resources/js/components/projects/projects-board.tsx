import ProjectOverlay from '@/components/projects/project-overlay'
import SortableProject from '@/components/projects/sortable-project'
import type { Project } from '@/types/project'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'

export default function ProjectsBoard({ projects = [] }: { projects: Project[] }) {
  function getDraggedProject(id: string | number) {
    return projects.find((project) => project.id === id)
  }

  return (
    <div>
      <DragDropProvider>
        <div className="grid flex-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project, index) => (
            <SortableProject
              index={index}
              key={project.id}
              project={project}
            />
          ))}
        </div>

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
