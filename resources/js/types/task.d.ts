export interface Label {
  id: number
  value: string
  label: string
}

export interface Status {
  id: number
  value: string
  label: string
}

export interface Priority {
  id: number
  value: string
  label: string
}

export interface Task {
  id: number
  title: string
  position: number
  description?: string
  project_id: number
  label?: Label
  status: Status
  priority: Priority
}
