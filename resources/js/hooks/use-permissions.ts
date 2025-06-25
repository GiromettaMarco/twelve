import type { SharedData } from '@/types'
import { usePage } from '@inertiajs/react'

export function usePermissions() {
  return usePage<SharedData>().props.auth.permissions
}
