export default function shouldIntercept(
  event: Pick<
    MouseEvent,
    'altKey' | 'ctrlKey' | 'defaultPrevented' | 'target' | 'currentTarget' | 'metaKey' | 'shiftKey' | 'button'
  >,
): boolean {
  const isLink = (event.currentTarget as HTMLElement).tagName.toLowerCase() === 'a'

  return !(
    (event.target && (event?.target as HTMLElement).isContentEditable) ||
    event.defaultPrevented ||
    (isLink && event.altKey) ||
    (isLink && event.ctrlKey) ||
    (isLink && event.metaKey) ||
    (isLink && event.shiftKey) ||
    (isLink && 'button' in event && event.button !== 0)
  )
}
