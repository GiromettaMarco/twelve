import { DeleteProject } from '@/components/projects/delete-project'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: DeleteProject,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof DeleteProject>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1
  }
}
