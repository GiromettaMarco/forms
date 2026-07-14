/**
 * Convert a javascript `Date` object to a string with the format `aaaa-mm-dd`.
 */
export function dateToString(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-${(date.getDate() + '').padStart(2, '0')}`
}

/**
 * Convert a string to a javascript `Date` object or undefined if the string is
 * not a valid date.
 */
export function stringToDate(string: string | undefined): Date | undefined {
  if (!string) {
    return undefined
  }

  const date = new Date(string)

  if (isNaN(date.getFullYear())) {
    return undefined
  }

  return date
}
