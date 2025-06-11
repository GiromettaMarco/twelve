import SortableProject from '@/components/projects/sortable-project'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { projectDummy } from './ProjectDummy'

const meta = {
  component: SortableProject,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof SortableProject>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: projectDummy,
    index: 1
  }
}
