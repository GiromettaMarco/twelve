import Login from '@/pages/auth/login'
import { forgotPassword, loginPost, register } from '@mocks/msw/http/auth'
import { home } from '@mocks/msw/http/home'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Login,
  parameters: {
    msw: {
      handlers: [home(), forgotPassword(), loginPost(), register()]
    }
  }
} satisfies Meta<typeof Login>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    canResetPassword: true
  }
}

export const NoPasswordReset: Story = {
  args: {
    canResetPassword: false
  }
}

export const WithSessionStatus: Story = {
  args: {
    status: 'session status here',
    canResetPassword: true
  }
}
