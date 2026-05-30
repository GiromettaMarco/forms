import { BasicRule } from '@gmcode/tsv-core'

/**
 * Parse value as a boolean.
 */
export class BoolRule extends BasicRule<boolean> {
  sanitize(value: unknown) {
    // Cast to boolean
    return !!value
  }

  test() {
    return true as const
  }
}
