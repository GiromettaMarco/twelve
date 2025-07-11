import { useTaskColumns } from '@/components/tasks/data-table/use-task-columns'
import { TasksDataTable } from '@/components/tasks/tasks-data-table'
import type { Task } from '@/types/task'
import { taskAll } from '@mocks/msw/http/task'
import {
  labels,
  priorities,
  statuses,
  taskDummy1,
  taskDummy2,
  taskDummy3,
  taskDummy4,
  taskDummy5
} from '@stories/dummies/TaskDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

function TasksDataTableWithHooks({ tasks }: { tasks: Task[] }) {
  const columns = useTaskColumns({ labels, statuses, priorities, totalTasks: tasks.length })

  return (
    <TasksDataTable
      columns={columns.columnDef}
      data={tasks}
      statuses={statuses}
      priorities={priorities}
    />
  )
}

const meta = {
  component: TasksDataTableWithHooks,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [taskAll()]
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof TasksDataTableWithHooks>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tasks: [taskDummy1, taskDummy2, taskDummy3, taskDummy4, taskDummy5]
  }
}
