import SortableProject from '@/components/projects/sortable-project'
import { getUrl } from '@mocks/url'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { http, HttpResponse } from 'msw'
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
  parameters: {
    msw: {
      handlers: [
        http.get(getUrl('/dashboard/projects/1'), () => {
          return new HttpResponse(null, { status: 200 })
        }),
        http.delete(getUrl('/dashboard/projects/1'), () => {
          return HttpResponse.json({
            component: 'projects/index',
            props: {
              errors: {},
              name: 'Twelve',
              sidebarOpen: false,
              flash: { title: 'Project deleted', description: null, level: 'success' }
            },
            url: '/dashboard/projects',
            version: '0056060350000172388ec83252a5a1b9',
            clearHistory: false,
            encryptHistory: false
          }, { status: 200 })
        })
      ]
    }
  },
  args: {
    project: projectDummy,
    index: 1
  }
}
