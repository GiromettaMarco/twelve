import { DeleteSmall } from '@/components/presets/delete-small'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

const meta = {
  component: DeleteSmall,
  parameters: {
    layout: 'centered'
  },
  args: {
    onClick: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof DeleteSmall>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
