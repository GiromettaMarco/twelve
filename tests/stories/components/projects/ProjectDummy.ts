import type { Project } from '@/types/project'

export const projectDummy: Project = {
  title: 'Project Dummy',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend vehicula accumsan. Mauris placerat imperdiet tristique. Aliquam ullamcorper tempus consequat.',
  id: 1,
  archived: false,
  deadline: '2025-05-27 00:00:00.000',
  created_at: '2025-05-26 03:48:41.000',
  updated_at: '2025-05-26 03:48:41.000',
  tasks: [
    {
      id: 1,
      title: "You can't compress the program without quantifying the open-source SSD pixel!",
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex felis, pharetra at metus vitae, rutrum vestibulum mi. Etiam id metus sed ligula semper sodales dapibus a sem. Donec sodales leo suscipit, blandit libero vitae, lacinia leo. Aliquam erat volutpat. Nunc tincidunt lectus eu feugiat hendrerit. Vivamus sed sollicitudin nisl. Donec ac ligula ac eros lobortis consequat.',
      label: {
        id: 2,
        title: 'documentation'
      },
      status: {
        id: 3,
        title: 'in progress'
      },
      priority: {
        id: 2,
        title: 'medium'
      }
    },
    {
      id: 2,
      title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
      label: {
        id: 2,
        title: 'documentation'
      },
      status: {
        id: 1,
        title: 'backlog'
      },
      priority: {
        id: 2,
        title: 'medium'
      }
    },
    {
      id: 3,
      title: 'We need to bypass the neural TCP card!',
      label: {
        id: 1,
        title: 'bug'
      },
      status: {
        id: 2,
        title: 'todo'
      },
      priority: {
        id: 3,
        title: 'high'
      }
    },
    {
      id: 4,
      title: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
      label: {
        id: 3,
        title: 'feature'
      },
      status: {
        id: 1,
        title: 'backlog'
      },
      priority: {
        id: 2,
        title: 'medium'
      }
    },
    {
      id: 5,
      title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
      label: {
        id: 3,
        title: 'feature'
      },
      status: {
        id: 5,
        title: 'canceled'
      },
      priority: {
        id: 2,
        title: 'medium'
      }
    }
  ]
}
