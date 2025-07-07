import { Badge } from '@/components/ui/badge'
import type { Label } from '@/types/task'
import { useLaravelReactI18n } from 'laravel-react-i18n'

interface TitleCellProps {
  title: string
  label?: Label
}

export default function TitleCell({ title, label }: TitleCellProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <div className="flex space-x-2">
      {label && <Badge variant="outline">{t(label.label)}</Badge>}
      <span className="truncate font-medium">{title}</span>
    </div>
  )
}
