import { EditSmall } from '@/components/presets/edit-small'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

const meta = {
  component: EditSmall,
  parameters: {
    layout: 'centered'
  },
  args: {
    onClick: fn()
  },
  tags: ['autodocs']
} satisfies Meta<typeof EditSmall>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#'
  }
}
