import Dashboard from '@/pages/dashboard'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { settings } from '@mocks/msw/http/settings'
import { userDummy1 } from '@stories/dummies/UserDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen } from 'storybook/test'

const pageDataWithFlashInfo = newPageData('dashboard', '/dashboard')
pageDataWithFlashInfo.props.flash.push({
  title: 'Something happened',
  description: null,
  level: 'info'
})

const pageDataWithoutPermissions = newPageData('dashboard', '/dashboard')
pageDataWithoutPermissions.props.auth.permissions.telescope = false
pageDataWithoutPermissions.props.auth.permissions.users.view = false

const meta = {
  component: Dashboard,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), logout()]
    }
  }
} satisfies Meta<typeof Dashboard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OpenUserMenu: Story = {
  play: async ({ canvas, userEvent }) => {
    // Simulate interactions with the component
    await userEvent.click(canvas.getByTestId('user-menu'))

    // Assert DOM structure
    await expect(screen.getByText(userDummy1.email)).toBeInTheDocument()
  }
}

export const FlashMessage: Story = {
  async beforeEach() {
    usePage.mockReturnValue(pageDataWithFlashInfo)
  }
}

export const WithoutPermissions: Story = {
  async beforeEach() {
    usePage.mockReturnValue(pageDataWithoutPermissions)
  }
}
