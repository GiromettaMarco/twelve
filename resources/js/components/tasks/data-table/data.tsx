import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
  type LucideProps
} from 'lucide-react'

export type LabelIcon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>

export const statusIcons: {
  [key: string]: LabelIcon | undefined
} = {
  backlog: HelpCircle,
  todo: Circle,
  in_progress: Timer,
  done: CheckCircle,
  canceled: CircleOff
}

export const priorityIcons: {
  [key: string]: LabelIcon | undefined
} = {
  low: ArrowDown,
  medium: ArrowRight,
  high: ArrowUp
}
