import Profile from '@/pages/settings/profile'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { deleteProfile, emailVerification, settings, updateProfile } from '@mocks/msw/http/settings'
import type { Meta, StoryObj } from '@storybook/react-vite'

const defaultPageData = newPageData('settings/profile', '/settings/profile')
const verifyEmailPageData = newPageData('settings/profile', '/settings/profile')
verifyEmailPageData.props.auth.user!.email_verified_at = null

const meta = {
  component: Profile,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), logout(), updateProfile(), deleteProfile(), emailVerification()]
    }
  }
} satisfies Meta<typeof Profile>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  async beforeEach() {
    usePage.mockReturnValue(defaultPageData)
  },
  args: {
    mustVerifyEmail: false
  }
}

export const MustVerifyEmail: Story = {
  async beforeEach() {
    usePage.mockReturnValue(verifyEmailPageData)
  },
  args: {
    mustVerifyEmail: true
  }
}

export const VerificationLinkSent: Story = {
  async beforeEach() {
    usePage.mockReturnValue(verifyEmailPageData)
  },
  args: {
    mustVerifyEmail: true,
    status: 'verification-link-sent'
  }
}
