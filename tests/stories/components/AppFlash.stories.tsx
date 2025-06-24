import AppFlash from '@/components/app-flash'
import { usePage } from '@mocks/@inertiajs/react/index.mock'
import { newPageData } from '@mocks/@inertiajs/react/usePage.mock'
import type { Meta, StoryObj } from '@storybook/react-vite'

const pageDataWithFlashInfo = newPageData('dashboard', '/dashboard')
pageDataWithFlashInfo.props.flash = {
  title: 'Something happened',
  description: null,
  level: 'info'
}

const pageDataWithFlashDesc = newPageData('dashboard', '/dashboard')
pageDataWithFlashDesc.props.flash = {
  title: 'Flash Message with Description',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  level: null
}

const pageDataWithFlashSuccess = newPageData('dashboard', '/dashboard')
pageDataWithFlashSuccess.props.flash = {
  title: 'Project created',
  description: null,
  level: 'success'
}

const pageDataWithFlashWarn = newPageData('dashboard', '/dashboard')
pageDataWithFlashWarn.props.flash = {
  title: 'Deadline expired',
  description: null,
  level: 'warning'
}

const pageDataWithFlashError = newPageData('dashboard', '/dashboard')
pageDataWithFlashError.props.flash = {
  title: 'Connection failed',
  description: null,
  level: 'error'
}

const meta = {
  component: AppFlash,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof AppFlash>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  async beforeEach() {
      usePage.mockReturnValue(pageDataWithFlashInfo)
    }
}

export const WithDescription: Story = {
  async beforeEach() {
    usePage.mockReturnValue(pageDataWithFlashDesc)
  }
}

export const Success: Story = {
  async beforeEach() {
    usePage.mockReturnValue(pageDataWithFlashSuccess)
  }
}

export const Warning: Story = {
  async beforeEach() {
    usePage.mockReturnValue(pageDataWithFlashWarn)
  }
}

export const Error: Story = {
  async beforeEach() {
    usePage.mockReturnValue(pageDataWithFlashError)
  }
}
