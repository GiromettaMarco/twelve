import type { InertiaLinkProps as LinkProps } from '@inertiajs/react'
import { router } from '@mocks/@inertiajs/core/router.mock'
import shouldIntercept from '@mocks/@inertiajs/core/shouldIntercept.mock'
import type { LinkPrefetchOption, Method, PendingVisit, RequestPayload, VisitOptions } from '@mocks/@inertiajs/core/types.mock'
import { mergeDataIntoQueryString } from '@mocks/@inertiajs/core/url.mock'
import { createElement, forwardRef, useEffect, useMemo, useRef, useState } from 'react'

export const Link = forwardRef<unknown, LinkProps>(
  (
    {
      children,
      as = 'a',
      data = {},
      href,
      method = 'get',
      preserveScroll = false,
      preserveState = null,
      replace = false,
      only = [],
      except = [],
      headers = {},
      queryStringArrayFormat = 'brackets',
      async = false,
      onClick = () => undefined,
      onCancelToken = () => undefined,
      onBefore = () => undefined,
      onStart = () => undefined,
      onProgress = () => undefined,
      onFinish = () => undefined,
      onCancel = () => undefined,
      onSuccess = () => undefined,
      onError = () => undefined,
      prefetch = false,
      cacheFor = 0,
      ...props
    },
    ref
  ) => {
    const [inFlightCount, setInFlightCount] = useState(0)
    const hoverTimeout = useRef<number>(null)

    as = as.toLowerCase()
    method = typeof href === 'object' ? href.method : (method.toLowerCase() as Method)
    const [_href, _data] = mergeDataIntoQueryString(
      method,
      typeof href === 'object' ? href.url : href || '',
      data,
      queryStringArrayFormat
    )
    const url = _href
    data = _data

    const baseParams = {
      data,
      method,
      preserveScroll,
      preserveState: preserveState ?? method !== 'get',
      replace,
      only,
      except,
      headers,
      async
    }

    const visitParams = {
      ...baseParams,
      onCancelToken,
      onBefore,
      onStart(event: PendingVisit) {
        setInFlightCount((count) => count + 1)
        onStart(event)
      },
      onProgress,
      onFinish(event: PendingVisit) {
        setInFlightCount((count) => count - 1)
        onFinish(event)
      },
      onCancel,
      onSuccess,
      onError
    }

    const doPrefetch = () => {
      // router.prefetch(url, baseParams, { cacheFor: cacheForValue })
    }

    const prefetchModes: LinkPrefetchOption[] = useMemo(
      () => {
        if (prefetch === true) {
          return ['hover']
        }

        if (prefetch === false) {
          return []
        }

        if (Array.isArray(prefetch)) {
          return prefetch
        }

        return [prefetch]
      },
      Array.isArray(prefetch) ? prefetch : [prefetch]
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cacheForValue = useMemo(() => {
      if (cacheFor !== 0) {
        // If they've provided a value, respect it
        return cacheFor
      }

      if (prefetchModes.length === 1 && prefetchModes[0] === 'click') {
        // If they've only provided a prefetch mode of 'click',
        // we should only prefetch for the next request but not keep it around
        return 0
      }

      // Otherwise, default to 30 seconds
      return 30_000
    }, [cacheFor, prefetchModes])

    useEffect(() => {
      return () => {
        clearTimeout(hoverTimeout.current || 0)
      }
    }, [])

    useEffect(() => {
      if (prefetchModes.includes('mount')) {
        setTimeout(() => doPrefetch())
      }
    }, prefetchModes)

    const regularEvents = {
      onClick: (event: React.MouseEvent<Element>) => {
        onClick(event)

        if (shouldIntercept(event)) {
          event.preventDefault()

          router.visit(url, visitParams as unknown as VisitOptions<RequestPayload>)
        }
      }
    }

    const prefetchHoverEvents = {
      onMouseEnter: () => {
        hoverTimeout.current = window.setTimeout(() => {
          doPrefetch()
        }, 75)
      },
      onMouseLeave: () => {
        clearTimeout(hoverTimeout.current || 0)
      },
      onClick: regularEvents.onClick
    }

    const prefetchClickEvents = {
      onMouseDown: (event: React.MouseEvent<Element>) => {
        if (shouldIntercept(event)) {
          event.preventDefault()
          doPrefetch()
        }
      },
      onMouseUp: (event: React.MouseEvent<Element>) => {
        event.preventDefault()

        router.visit(url, visitParams as unknown as VisitOptions<RequestPayload>)
      },
      onClick: (event: React.MouseEvent<Element>) => {
        onClick(event)

        if (shouldIntercept(event)) {
          // Let the mouseup event handle the visit
          event.preventDefault()
        }
      }
    }

    if (method !== 'get') {
      as = 'button'
    }

    const elProps = {
      a: { href: url },
      button: { type: 'button' }
    }

    return createElement(
      as,
      {
        ...props,
        // @ts-expect-error: undeclared type
        ...(elProps[as] || {}),
        ref,
        ...(() => {
          if (prefetchModes.includes('hover')) {
            return prefetchHoverEvents
          }

          if (prefetchModes.includes('click')) {
            return prefetchClickEvents
          }

          return regularEvents
        })(),
        'data-loading': inFlightCount > 0 ? '' : undefined
      },
      children
    )
  }
)
Link.displayName = 'InertiaLink'

export default Link
