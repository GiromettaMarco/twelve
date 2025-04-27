export interface Label {
  id: number
  title: string
}

export interface Status {
  id: number
  title: string
}

export interface Priority {
  id: number
  title: string
}

export interface Task {
  id: number
  title: string
  label: Label
  status: Status
  priority: Priority
}
