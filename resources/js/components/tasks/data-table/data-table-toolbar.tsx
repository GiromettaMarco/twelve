'use client'

import { DataTableFacetedFilter } from '@/components/tasks/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/tasks/data-table/data-table-view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Priority, Status } from '@/types/task'
import { Table } from '@tanstack/react-table'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { X } from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  statuses: Status[]
  priorities: Priority[]
}

export function DataTableToolbar<TData>({ table, statuses, priorities }: DataTableToolbarProps<TData>) {
  // Setup translations
  const { t, tChoice } = useLaravelReactI18n()

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title={tChoice('Status', 1)}
            options={statuses}
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            title={tChoice('Priority', 1)}
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            {t('Reset')}
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
