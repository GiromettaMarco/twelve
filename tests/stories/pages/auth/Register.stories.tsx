import Register from '@/pages/auth/register'
import { login, registerPost } from '@mocks/msw/http/auth'
import { home } from '@mocks/msw/http/home'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Register,
  parameters: {
    msw: {
      handlers: [home(), login(), registerPost()]
    }
  }
} satisfies Meta<typeof Register>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
