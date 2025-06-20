import Language from '@/pages/settings/language'
import { logout } from '@mocks/msw/http/auth'
import { dashboard } from '@mocks/msw/http/dashboard'
import { language, settings } from '@mocks/msw/http/settings'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Language,
  parameters: {
    msw: {
      handlers: [dashboard(), settings(), language(), logout()]
    }
  }
} satisfies Meta<typeof Language>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
