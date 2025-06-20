import type { Project } from '@/types/project'
import { taskDummy1, taskDummy2, taskDummy3, taskDummy4, taskDummy5 } from './TaskDummies'

export const projectDummy1: Project = {
  title: 'Laravel boilerplate',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend vehicula accumsan. Mauris placerat imperdiet tristique. Aliquam ullamcorper tempus consequat.',
  id: 1,
  archived: false,
  deadline: '2025-05-27 00:00:00.000',
  created_at: '2025-05-26 03:48:41.000',
  updated_at: '2025-05-26 03:48:41.000',
  tasks: [taskDummy1, taskDummy2, taskDummy3, taskDummy4, taskDummy5]
}

export const projectDummy2: Project = {
  title: 'React App with SSR',
  description: 'Etiam mollis nulla in enim ullamcorper.',
  id: 2,
  archived: false,
  deadline: '2025-06-18 00:00:00.000',
  created_at: '2025-05-28 03:48:41.000',
  updated_at: '2025-05-28 03:48:41.000',
  tasks: []
}

export const projectDummy3: Project = {
  title: 'Storybook testing',
  id: 3,
  archived: false,
  created_at: '2025-04-16 03:48:41.000',
  updated_at: '2025-04-16 03:48:41.000',
  tasks: []
}

export const projectDummy4: Project = {
  title: 'Docker container',
  id: 4,
  archived: false,
  created_at: '2025-05-10 03:48:41.000',
  updated_at: '2025-05-10 03:48:41.000',
  tasks: []
}
