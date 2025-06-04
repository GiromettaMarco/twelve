import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Trash2 } from 'lucide-react'
import type { ComponentProps } from 'react'

type DeleteProps = ComponentProps<'button'> & {
  label?: string
}

export function DeleteSmall({ label = 'Delete', ...props }: DeleteProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          aria-label={label}
          className="transition-colors hover:text-red-600"
          {...props}
        >
          <Trash2 className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
