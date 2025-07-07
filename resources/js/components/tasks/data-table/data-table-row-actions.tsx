'use client'

import DeleteTask from '@/components/tasks/data-table/actions/delete-task'
import UpdateLabel from '@/components/tasks/data-table/actions/update-label'
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

interface DataTableRowActionsProps<TData extends Task> {
  row: Row<TData>
  labels: Label[]
  statuses: Status[]
  priorities: Priority[]
}

export function DataTableRowActions<TData extends Task>({
  row,
  labels,
  statuses,
  priorities
}: DataTableRowActionsProps<TData>) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const task = row.original

  return (
    <DropdownMenu>
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
        align="end"
        className="w-[160px]"
      >
        {/* @TODO */}
        <DropdownMenuItem>{t('Edit')}</DropdownMenuItem>

        {/* @TODO */}
        <DropdownMenuItem>{t('Reorder')}</DropdownMenuItem>

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
