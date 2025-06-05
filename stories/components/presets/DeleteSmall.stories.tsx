import { DeleteSmall } from '@/components/presets/delete-small'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: DeleteSmall,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof DeleteSmall>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
