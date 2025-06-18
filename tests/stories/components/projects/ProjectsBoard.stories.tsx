import ProjectsBoard from '@/components/projects/projects-board'
import { deleteProject, showProject } from '@mocks/msw/http/project'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { projectDummy1, projectDummy2, projectDummy3, projectDummy4 } from './ProjectDummies'

const meta = {
  component: ProjectsBoard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProjectsBoard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [showProject(), deleteProject()]
    }
  },
  args: {
    projects: [projectDummy1, projectDummy2, projectDummy3, projectDummy4]
  }
}
