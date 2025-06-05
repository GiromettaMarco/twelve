import { Button } from '@/components/ui/button'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { Plus } from 'lucide-react'
import type { ComponentProps } from 'react'

type AddProps = ComponentProps<'button'> & {
  label?: string
}

/** Add button preset */
export function Add({ label, ...props }: AddProps) {
  // Setup translations
  const { t } = useLaravelReactI18n()

  return (
    <Button
      size="sm"
      className="h-7"
      aria-label={label ?? t('Add')}
      {...props}
    >
      <Plus />
      {label && <div className="sr-only lg:not-sr-only">{label}</div>}
    </Button>
  )
}
