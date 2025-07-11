import { Add } from '@/components/presets/add'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

const meta = {
  component: Add,
  parameters: {
    layout: 'centered'
  },
  args: {
    onClick: fn()
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
