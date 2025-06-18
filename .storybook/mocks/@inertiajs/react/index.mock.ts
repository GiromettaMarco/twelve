import type { InertiaFormProps as FormProps, InertiaLinkProps as LinkProps } from '@inertiajs/react'
import originalUsePage from '@mocks/@inertiajs/react/usePage.mock'
import { fn } from 'storybook/test'

export const usePage = fn(originalUsePage).mockName('usePage')

export { default as Head } from './Head.mock'
export { default as Link } from './link.mock'
export { default as useForm } from './useForm.mock'
export { FormProps as InertiaFormProps, LinkProps as InertiaLinkProps }
