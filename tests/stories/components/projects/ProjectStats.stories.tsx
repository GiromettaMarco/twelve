import ProjectStats from '@/components/projects/project-stats'
import { projectDummy1 } from '@stories/dummies/ProjectDummies'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: ProjectStats,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProjectStats>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: projectDummy1
  }
}
