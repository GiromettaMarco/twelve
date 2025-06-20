import Password from '@/pages/settings/password'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { password, settings } from '@mocks/msw/http/settings'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Password,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), logout(), password()]
    }
  }
} satisfies Meta<typeof Password>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
