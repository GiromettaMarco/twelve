import { mergeWith } from 'es-toolkit'
import qs from 'qs'
import type { FormDataConvertible, Method } from './types.mock'

export function mergeDataIntoQueryString(
  method: Method,
  href: URL | string,
  data: Record<string, FormDataConvertible>,
  qsArrayFormat: 'indices' | 'brackets' = 'brackets'
): [string, Record<string, FormDataConvertible>] {
  const hasHost = /^[a-z][a-z0-9+.-]*:\/\//i.test(href.toString())
  const hasAbsolutePath = hasHost || href.toString().startsWith('/')
  const hasRelativePath = !hasAbsolutePath && !href.toString().startsWith('#') && !href.toString().startsWith('?')
  const hasSearch = href.toString().includes('?') || (method === 'get' && Object.keys(data).length)
  const hasHash = href.toString().includes('#')

  const url = new URL(href.toString(), 'http://localhost')

  if (method === 'get' && Object.keys(data).length) {
    url.search = qs.stringify(
      mergeWith(qs.parse(url.search, { ignoreQueryPrefix: true }), data, (_, sourceValue, key, target) => {
        if (sourceValue === undefined) {
          delete target[key]
        }
      }),
      {
        encodeValuesOnly: true,
        arrayFormat: qsArrayFormat
      }
    )
    data = {}
  }

  return [
    [
      hasHost ? `${url.protocol}//${url.host}` : '',
      hasAbsolutePath ? url.pathname : '',
      hasRelativePath ? url.pathname.substring(1) : '',
      hasSearch ? url.search : '',
      hasHash ? url.hash : ''
    ].join(''),
    data
  ]
}
