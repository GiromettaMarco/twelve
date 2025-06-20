import VerifyEmail from '@/pages/auth/verify-email'
import { logout, verificationNotification } from '@mocks/msw/http/auth'
import { home } from '@mocks/msw/http/home'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: VerifyEmail,
  parameters: {
    msw: {
      handlers: [home(), logout(), verificationNotification()]
    }
  }
} satisfies Meta<typeof VerifyEmail>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const VerificationLinkSent: Story = {
  args: {
    status: 'verification-link-sent'
  }
}
