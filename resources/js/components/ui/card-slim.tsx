import type { ReactNode } from 'react'

interface CardSlimProps {
  header?: ReactNode | string
  content?: ReactNode | string
  footer?: ReactNode | string
}

export default function CardSlim({ header, content, footer }: CardSlimProps) {
  return (
    <div className="w-full flex-none gap-2 overflow-hidden border-none md:w-80 xl:w-[22rem]">
      {header && <div>{header}</div>}
      {content && <div>{content}</div>}
      {footer && <div>{footer}</div>}
    </div>
  )
}
