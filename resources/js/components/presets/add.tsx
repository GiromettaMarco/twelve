import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { ComponentProps } from 'react'

type AddProps = ComponentProps<'button'> & {
  label?: string
}

export function Add({ label, ...props }: AddProps) {
  return (
    <Button
      size="sm"
      className="h-7"
      aria-label={label}
      {...props}
    >
      <Plus />
      {label && <div className="sr-only lg:not-sr-only">{label}</div>}
    </Button>
  )
}
