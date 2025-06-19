import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

type LoginProps = ComponentProps<typeof Link> & {
  variant?: 'default' | 'borderless'
}

const loginVariants = cva(
  'inline-block rounded-sm border px-5 py-1.5 text-sm leading-normal transition-colors hover:border-neutral-950 dark:hover:border-neutral-500',
  {
    variants: {
      variant: {
        default: 'border-neutral-900 dark:border-neutral-600',
        borderless: 'border-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

/** Add button preset */
export function Login({ children, variant, className = '', ...props }: LoginProps) {
  return (
    <Link
      className={cn(loginVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  )
}
