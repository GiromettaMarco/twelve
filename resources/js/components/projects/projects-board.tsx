import ProjectOverlay from '@/components/projects/project-overlay'
import SortableProject from '@/components/projects/sortable-project'
import type { Project } from '@/types/project'
import { arrayMove } from '@dnd-kit/helpers'
import { DragDropProvider, DragOverlay, type DragDropEvents } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import { router } from '@inertiajs/react'
import { useState } from 'react'

// @NOTE Can't use an interface due to poor type definition
// @see https://github.com/inertiajs/inertia/issues/2188
type PositionChange = {
  id: number
  position: number
}

export default function ProjectsBoard({ projects = [] }: { projects: Project[] }) {
  // Keep track of items order
  const [items, setItems] = useState(projects.map((project) => project.id))

  /**
   * Get an array with position changes to be send to the server.
   *
   * @param initial Initial index of the element being dragged
   * @param target New index after the drag operation concluded
   * @returns Array of PositionChange
   */
  function getPositionChanges(initial: number, target: number) {
    const changes: PositionChange[] = []

    // Nothing changed
    if (initial === target) {
      return changes
    }

    // Add the destination
    changes.push({
      id: items[initial],
      position: target
    })

    // Shift elements
    if (initial > target) {
      for (let i = target; i < initial; i++) {
        changes.push({
          id: items[i],
          position: i + 1
        })
      }
    }

    // Unshift elements
    if (initial < target) {
      for (let i = target; i > initial; i--) {
        changes.push({
          id: items[i],
          position: i - 1
        })
      }
    }

    return changes
  }

  const handleDragEnd: DragDropEvents['dragend'] = (event) => {
    const { source } = event.operation

    if (!isSortable(source)) {
      return
    }

    const oldIndex = source.sortable.initialIndex
    const newIndex = source.sortable.index

    if (oldIndex === newIndex) {
      return
    }

    router.patch(route('projects.reorder'), {
      data: getPositionChanges(oldIndex, newIndex)
    })

    setItems(arrayMove(items, oldIndex, newIndex))
  }

  function getDraggedProject(id: string | number) {
    return projects.find((project) => project.id === id)
  }

  return (
    <div>
      <DragDropProvider onDragEnd={handleDragEnd}>
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
