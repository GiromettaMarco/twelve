import Projects from '@/pages/projects'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { defaultData } from '@mocks/@inertiajs/react/usePage.mock'
import { createProject, deleteProject, showProject } from '@mocks/msw/http/project'
import { getUrl } from '@mocks/url'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { projectDummy1, projectDummy2, projectDummy3, projectDummy4 } from '../../components/projects/ProjectDummies'

const meta = {
  component: Projects,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Projects>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  async beforeEach() {
    const pageData = defaultData
    pageData.component = 'projects/index'
    pageData.url = '/dashboard/projects'
    pageData.props.ziggy.location = getUrl('/dashboard/projects')

    usePage.mockReturnValue(pageData)
  },
  parameters: {
    msw: {
      handlers: [showProject(), deleteProject(), createProject()]
    }
  },
  args: {
    projects: [projectDummy1, projectDummy2, projectDummy3, projectDummy4]
  }
}
