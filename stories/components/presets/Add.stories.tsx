import { Add } from '@/components/presets/add'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Add,
  // title: 'components/presets/Add',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Add>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Add Project'
  }
}
