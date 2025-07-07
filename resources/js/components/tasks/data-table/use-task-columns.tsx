import { DataTableColumnHeader } from '@/components/tasks/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/tasks/data-table/data-table-row-actions'
import TitleCell from '@/components/tasks/data-table/title-cell'
import PriorityLabel from '@/components/tasks/priority-label'
import StatusLabel from '@/components/tasks/status-label'
import { Checkbox } from '@/components/ui/checkbox'
import type { Label, Priority, Status, Task } from '@/types/task'
import { ColumnDef } from '@tanstack/react-table'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { useState } from 'react'

interface UseTaskscolumnsProps {
  labels: Label[]
  statuses: Status[]
  priorities: Priority[]
  totalTasks: number
}

export function useTaskColumns({ labels, statuses, priorities, totalTasks }: UseTaskscolumnsProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const [columnDef] = useState<ColumnDef<Task>[]>([
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t('Select all')}
          className="block"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t('Select row')}
          className="block"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'position',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('#')}
        />
      ),
      cell: ({ row }) => <div>{row.getValue('position')}</div>,
      enableSorting: true,
      enableHiding: true
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('Title')}
        />
      ),
      cell: ({ row }) => {
        const label = labels.find((label) => label.value === row.original.label?.value)
        const status = statuses.find((status) => status.value === row.original.status.value)

        return (
          <TitleCell
            title={row.getValue('title')}
            label={label}
            status={status}
          />
        )
      }
    },
    {
      accessorKey: 'status',
      accessorFn: (row) => row.status.value,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('Status')}
        />
      ),
      cell: ({ row }) => {
        const status = statuses.find((status) => status.value === row.getValue('status'))
        return status && <StatusLabel status={status} />
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      accessorKey: 'priority',
      accessorFn: (row) => t(row.priority.value),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('Priority')}
        />
      ),
      cell: ({ row }) => {
        const priority = priorities.find((priority) => priority.value === row.getValue('priority'))
        return priority && <PriorityLabel priority={priority} />
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          labels={labels}
          statuses={statuses}
          priorities={priorities}
          totalTasks={totalTasks}
        />
      )
    }
  ])

  return { columnDef }
}
