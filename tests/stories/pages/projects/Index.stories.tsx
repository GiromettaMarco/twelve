import Projects from '@/pages/projects'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { createProject, deleteProject, showProject } from '@mocks/msw/http/project'
import { settings } from '@mocks/msw/http/settings'
import { projectDummy1, projectDummy2, projectDummy3, projectDummy4 } from '@stories/dummies/ProjectDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  async beforeEach() {
    usePage.mockReturnValue(newPageData('projects/index', '/dashboard/projects'))
  },
  component: Projects,
  parameters: {
    msw: {
      handlers: [showProject(), deleteProject(), createProject(), dashboard(), settings(), logout()]
    }
  }
} satisfies Meta<typeof Projects>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    projects: [projectDummy1, projectDummy2, projectDummy3, projectDummy4]
  }
}
