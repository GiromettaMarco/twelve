import { Badge } from '@/components/ui/badge'
import type { Label, Status } from '@/types/task'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { CircleCheckBig } from 'lucide-react'

interface TitleCellProps {
  title: string
  label?: Label
  status?: Status
}

export default function TitleCell({ title, label, status }: TitleCellProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <div className="flex items-center space-x-2">
      {status?.value === 'done' && <CircleCheckBig className="size-4" />}
      {label && <Badge variant="outline">{t(label.label)}</Badge>}
      <span className="truncate font-medium">{title}</span>
    </div>
  )
}
