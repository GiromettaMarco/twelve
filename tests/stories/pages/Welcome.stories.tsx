import Welcome from '@/pages/welcome'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import { login, register } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import type { Meta, StoryObj } from '@storybook/react-vite'

const userPageData = newPageData('welcome', '/')
const guestPageData = newPageData('welcome', '/')
guestPageData.props.auth.user = null

const meta = {
  component: Welcome,
  parameters: {
    msw: {
      handlers: [login(), register(), dashboard()]
    }
  }
} satisfies Meta<typeof Welcome>

export default meta

type Story = StoryObj<typeof meta>

export const Guest: Story = {
  async beforeEach() {
    usePage.mockReturnValue(guestPageData)
  }
}

export const User: Story = {
  async beforeEach() {
    usePage.mockReturnValue(userPageData)
  }
}
