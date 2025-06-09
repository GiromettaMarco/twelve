import AddProject from '@/components/projects/add-project'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: AddProject,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof AddProject>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
