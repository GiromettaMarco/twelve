import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from '@inertiajs/react'
import { FilePen } from 'lucide-react'
import type { ComponentProps } from 'react'

type EditProps = ComponentProps<'button'> & {
  href: string
  label?: string
}

export function EditSmall({ href, label = 'Edit', ...props }: EditProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          size="sm"
          variant="ghost"
          aria-label={label}
          {...props}
        >
          <Link href={href}>
            <FilePen className="size-5" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
