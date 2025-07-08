'use client'

import DeleteTask from '@/components/tasks/data-table/actions/delete-task'
import UpdateLabel from '@/components/tasks/data-table/actions/update-label'
import UpdatePosition from '@/components/tasks/data-table/actions/update-position'
import UpdatePriority from '@/components/tasks/data-table/actions/update-priority'
import UpdateStatus from '@/components/tasks/data-table/actions/update-status'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { Label, Priority, Status, Task } from '@/types/task'
import { Row } from '@tanstack/react-table'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DataTableRowActionsProps<TData extends Task> {
  row: Row<TData>
  labels: Label[]
  statuses: Status[]
  priorities: Priority[]
  totalTasks: number
}

export function DataTableRowActions<TData extends Task>({
  row,
  labels,
  statuses,
  priorities,
  totalTasks
}: DataTableRowActionsProps<TData>) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const task = row.original

  const [menuOpen, setMenuOpen] = useState(false)
  const [updatePositionOpen, setUpdatePositionOpen] = useState(false)

  useEffect(() => {
    if (!updatePositionOpen) {
      setMenuOpen(false)
    }
  }, [updatePositionOpen])

  return (
    <DropdownMenu
      open={menuOpen}
      onOpenChange={setMenuOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <MoreHorizontal />
          <span className="sr-only">{t('Open menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        hidden={updatePositionOpen}
        align="end"
        className="w-[160px]"
      >
        {/* @TODO */}
        <DropdownMenuItem>{t('Edit')}</DropdownMenuItem>

        <UpdatePosition
          task={task}
          max={Math.max(0, totalTasks - 1)}
          open={updatePositionOpen}
          setOpen={setUpdatePositionOpen}
        />

        <DropdownMenuSeparator />

        <UpdateLabel
          task={task}
          labels={labels}
        />

        <UpdateStatus
          task={task}
          statuses={statuses}
        />

        <UpdatePriority
          task={task}
          priorities={priorities}
        />

        <DropdownMenuSeparator />

        <DeleteTask task={task} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
