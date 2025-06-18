import { TasksDataTable } from '@/components/tasks/tasks-data-table'
import { useTaskColumns } from '@/components/tasks/use-task-columns'
import type { Task } from '@/types/task'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { taskDummy1, taskDummy2, taskDummy3, taskDummy4, taskDummy5 } from './TaskDummies'

function TasksDataTableWithHooks({ data }: { data: Task[] }) {
  const columns = useTaskColumns()

  return (
    <TasksDataTable
      columns={columns.columnDef}
      data={data}
    />
  )
}

const meta = {
  component: TasksDataTableWithHooks,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TasksDataTableWithHooks>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [taskDummy1, taskDummy2, taskDummy3, taskDummy4, taskDummy5]
  }
}
