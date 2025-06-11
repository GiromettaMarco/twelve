import ProjectStats from '@/components/projects/project-stats'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { projectDummy } from './ProjectDummy'

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
    project: projectDummy
  }
}
