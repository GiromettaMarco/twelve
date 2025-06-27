import { Toaster } from '@/components/ui/sonner'
import type { SharedData } from '@/types'
import { usePage } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function AppFlash() {
  // Setup translations
  const { t } = useLaravelReactI18n()

  const { flash } = usePage<SharedData>().props

  useEffect(() => {
    flash.forEach((message) => {
      if (message.title) {
        switch (message.level) {
          case 'success':
            toast.success(message.title, { description: message.description ?? undefined })
            break

          case 'info':
            toast.info(message.title, { description: message.description ?? undefined })
            break

          case 'warning':
            toast.warning(message.title, { description: message.description ?? undefined })
            break

          case 'error':
            toast.error(message.title, { description: message.description ?? undefined })
            break

          default:
            toast(message.title, { description: message.description ?? undefined })
            break
        }
      }
    })
  }, [flash])

  const toastOptions = {
    closeButtonAriaLabel: t('Close')
  }

  return (
    <Toaster
      position="bottom-center"
      closeButton={true}
      containerAriaLabel={t('Notifications')}
      toastOptions={toastOptions}
      // duration={500000}
      // richColors={true}
    />
  )
}
