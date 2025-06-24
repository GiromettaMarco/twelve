import { Ziggy } from '@mocks/ziggy/ziggy.mock'
import type { PartialStoryFn } from 'storybook/internal/csf'
import { useRoute } from 'ziggy-js'

export default function withZiggy() {
  return (Story: PartialStoryFn) => {
    // @ts-expect-error: using undeclared globalThis
    globalThis.route = useRoute(Ziggy)

    return <Story />
  }
}
