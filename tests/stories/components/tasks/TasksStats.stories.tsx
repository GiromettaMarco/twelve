import TasksStats from '@/components/tasks/tasks-stats'
import { projectDummy1 } from '@stories/dummies/ProjectDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: TasksStats,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TasksStats>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tasks: projectDummy1.tasks
  }
}
