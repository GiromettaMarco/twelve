/**
 * The entry point root (protol included)
 */
export const url = 'http://localhost:6006'

/**
 * Get the entry point url
 * 
 * @param path (optional) url path/page
 * @returns 
 */
export function getUrl(path?: string) {
  return url + path
}
