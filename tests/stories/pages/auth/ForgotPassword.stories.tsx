import ForgotPassword from '@/pages/auth/forgot-password'
import { forgotPasswordPost, login } from '@mocks/msw/http/auth'
import { home } from '@mocks/msw/http/home'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ForgotPassword,
  parameters: {
    msw: {
      handlers: [home(), login(), forgotPasswordPost()]
    }
  }
} satisfies Meta<typeof ForgotPassword>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSessionStatus: Story = {
  args: {
    status: 'session status here'
  }
}
