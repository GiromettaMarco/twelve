import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@inertiajs/react'
import type { ReactNode } from 'react'

interface CardStandardProps {
  title: ReactNode | string
  href?: string
  description?: ReactNode | string
  action?: ReactNode
  content?: ReactNode | string
  footer?: ReactNode | string
}

function ProjectTitle(title: ReactNode | string) {
  return <CardTitle className="md:truncate md:leading-[1.5rem]">{title}</CardTitle>
}

export default function CardStandard({ title, href, description, action, content, footer }: CardStandardProps) {
  return (
    <Card className="w-full flex-none gap-4 md:h-96 md:w-[28rem] 2xl:w-[31.25rem]">
      <CardHeader>
        {href ? <Link href={href}>{ProjectTitle(title)}</Link> : ProjectTitle(title)}
        {description && <CardDescription className="mt-2 md:h-5 md:truncate">{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  )
}
