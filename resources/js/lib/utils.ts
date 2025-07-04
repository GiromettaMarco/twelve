import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names.
 *
 * @param inputs Any number of class names
 * @returns A string with all the input
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDocument() {
  return typeof document !== 'undefined'
}

export function isWindow() {
  return typeof window !== 'undefined'
}

export function isBrowser() {
  return isWindow()
}

export function isServer() {
  return typeof window === 'undefined'
}
