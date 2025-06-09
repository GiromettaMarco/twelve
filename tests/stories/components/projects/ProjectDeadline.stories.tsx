import ProjectDeadline from '@/components/projects/project-deadline'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProjectDeadline,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProjectDeadline>

export default meta

type Story = StoryObj<typeof meta>

export const DateStringDB: Story = {
  args: {
    rawDeadline: '2025-07-27 00:00:00.000'
  }
}

export const DateStringShort: Story = {
  args: {
    rawDeadline: '2025-07-27'
  }
}

export const Empty: Story = {
  args: {
    rawDeadline: ''
  }
}

export const InvalidDate: Story = {
  args: {
    rawDeadline: '2013-13-32'
  }
}
