import SortableProject from '@/components/projects/sortable-project'
import { deleteProject, showProject } from '@mocks/msw/http/project'
import { projectDummy1 } from '@stories/dummies/ProjectDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

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
  parameters: {
    msw: {
      handlers: [showProject(), deleteProject()]
    }
  },
  args: {
    project: projectDummy1,
    index: 1
  }
}
