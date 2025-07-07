import Project from '@/pages/projects/show'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { updateProjectDeadline, updateProjectInfo } from '@mocks/msw/http/project'
import { settings } from '@mocks/msw/http/settings'
import { taskAll } from '@mocks/msw/http/task'
import { projectDummy1 } from '@stories/dummies/ProjectDummies'
import { labels, priorities, statuses } from '@stories/dummies/TaskDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  async beforeEach() {
    usePage.mockReturnValue(newPageData('projects/show', '/dashboard/project/1'))
  },
  component: Project,
  parameters: {
    msw: {
      handlers: [updateProjectInfo(), updateProjectDeadline(), dashboard(), settings(), logout(), taskAll()]
    }
  }
} satisfies Meta<typeof Project>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: projectDummy1,
    labels: labels,
    statuses: statuses,
    priorities: priorities
  }
}
