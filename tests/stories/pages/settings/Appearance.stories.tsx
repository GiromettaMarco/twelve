import Appearance from '@/pages/settings/appearance'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { settings } from '@mocks/msw/http/settings'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Appearance,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), logout()]
    }
  }
} satisfies Meta<typeof Appearance>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
