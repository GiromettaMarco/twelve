import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { flexRender, Table } from '@tanstack/react-table'

interface DataTableHeader<TData> {
  table: Table<TData>
}

export default function DataTableHeader<TData>({ table }: DataTableHeader<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            let className = undefined

            switch (header.id) {
              case 'select':
                className = 'w-10'
                break

              case 'position':
                className = 'w-14'
                break

              case 'status':
                className = 'w-32'
                break

              case 'priority':
                className = 'w-24'
                break

              case 'actions':
                className = 'w-16'
                break

              default:
                break
            }

            return (
              <TableHead
                key={header.id}
                className={className}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
