import ConfirmPassword from '@/pages/auth/confirm-password'
import { confirmPassword } from '@mocks/msw/http/auth'
import { home } from '@mocks/msw/http/home'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ConfirmPassword,
  parameters: {
    msw: {
      handlers: [home(), confirmPassword()]
    }
  }
} satisfies Meta<typeof ConfirmPassword>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
