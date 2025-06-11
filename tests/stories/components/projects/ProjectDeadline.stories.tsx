import ProjectDeadline from '@/components/projects/project-deadline'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { addDays, format } from 'date-fns'

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

export const RemoteDeadline: Story = {
  args: {
    rawDeadline: format(addDays(new Date(), 10), 'yyyy-MM-dd')
  }
}

export const NearDeadline: Story = {
  args: {
    rawDeadline: format(addDays(new Date(), 5), 'yyyy-MM-dd')
  }
}

export const TomorrowDeadline: Story = {
  args: {
    rawDeadline: format(addDays(new Date(), 1), 'yyyy-MM-dd')
  }
}

export const TodayDeadline: Story = {
  args: {
    rawDeadline: format(new Date(), 'yyyy-MM-dd')
  }
}

export const YesterdayDeadline: Story = {
  args: {
    rawDeadline: format(addDays(new Date(), -1), 'yyyy-MM-dd')
  }
}

export const PastDeadline: Story = {
  args: {
    rawDeadline: format(addDays(new Date(), -10), 'yyyy-MM-dd')
  }
}
