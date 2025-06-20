import Users from '@/pages/users'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { settings } from '@mocks/msw/http/settings'
import { userDummy1 } from '@stories/dummies/UserDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Users,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), logout()]
    }
  },
  args: {
    users: [userDummy1]
  }
} satisfies Meta<typeof Users>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
