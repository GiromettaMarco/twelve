import ResetPassword from '@/pages/auth/reset-password'
import { resetPassword } from '@mocks/msw/http/auth'
import { home } from '@mocks/msw/http/home'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ResetPassword,
  parameters: {
    msw: {
      handlers: [home(), resetPassword()]
    }
  },
  args: {
    token: 'fillertoken',
    email: 'girometta.marco@gmail.com'
  }
} satisfies Meta<typeof ResetPassword>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
