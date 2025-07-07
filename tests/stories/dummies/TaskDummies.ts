import type { Label, Priority, Status, Task } from '@/types/task'

export const labels: Label[] = [
  {
    id: 1,
    value: 'bug',
    label: 'bug'
  },
  {
    id: 2,
    value: 'documentation',
    label: 'documentation'
  },
  {
    id: 3,
    value: 'feature',
    label: 'feature'
  }
]

export const statuses: Status[] = [
  {
    id: 1,
    value: 'backlog',
    label: 'backlog'
  },
  {
    id: 2,
    value: 'todo',
    label: 'todo'
  },
  {
    id: 3,
    value: 'in_progress',
    label: 'in progress'
  },
  {
    id: 4,
    value: 'done',
    label: 'done'
  },
  {
    id: 5,
    value: 'canceled',
    label: 'canceled'
  }
]

export const priorities: Priority[] = [
  {
    id: 1,
    value: 'low',
    label: 'Low'
  },
  {
    id: 2,
    value: 'medium',
    label: 'Medium'
  },
  {
    id: 3,
    value: 'high',
    label: 'High'
  }
]

export const taskDummy1: Task = {
  id: 1,
  title: "You can't compress the program without quantifying the open-source SSD pixel!",
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex felis, pharetra at metus vitae, rutrum vestibulum mi. Etiam id metus sed ligula semper sodales dapibus a sem. Donec sodales leo suscipit, blandit libero vitae, lacinia leo. Aliquam erat volutpat. Nunc tincidunt lectus eu feugiat hendrerit. Vivamus sed sollicitudin nisl. Donec ac ligula ac eros lobortis consequat.',
  label: labels[1],
  status: statuses[2],
  priority: priorities[1],
  project_id: 1
}

export const taskDummy2: Task = {
  id: 2,
  title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
  label: labels[1],
  status: statuses[0],
  priority: priorities[1],
  project_id: 1
}

export const taskDummy3: Task = {
  id: 3,
  title: 'We need to bypass the neural TCP card!',
  label: labels[0],
  status: statuses[1],
  priority: priorities[2],
  project_id: 1
}

export const taskDummy4: Task = {
  id: 4,
  title: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
  label: labels[2],
  status: statuses[0],
  priority: priorities[1],
  project_id: 1
}

export const taskDummy5: Task = {
  id: 5,
  title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
  label: labels[2],
  status: statuses[4],
  priority: priorities[1],
  project_id: 1
}
