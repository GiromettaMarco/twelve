import Project from '@/pages/projects/show'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { settings } from '@mocks/msw/http/settings'
import { projectDummy1 } from '@stories/dummies/ProjectDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  async beforeEach() {
    usePage.mockReturnValue(newPageData('projects/show', '/dashboard/project/1'))
  },
  component: Project,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), logout()]
    }
  }
} satisfies Meta<typeof Project>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: projectDummy1
  }
}
