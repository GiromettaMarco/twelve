import { GripVertical } from 'lucide-react'
import type { ComponentProps } from 'react'

// @FIXME instead of using aria-label, use (and translate) the accessibility options of dnd-kit

type MoveProps = ComponentProps<'div'> & {
  label?: string
}

export function Move({ label = 'Move', ...props }: MoveProps) {
  return (
    <div
      className="md:px-1"
      aria-label={label}
      {...props}
    >
      <GripVertical className="size-6" />
    </div>
  )
}
