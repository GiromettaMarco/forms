/**
 * Convert a javascript `Date` object to a string with the format `aaaa-mm-dd`.
 */
export function defaultDateFormatter(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`
}
