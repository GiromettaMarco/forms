import { BoolRule } from '@/rules/bool.ts'

/**
 * Parse value as a boolean.
 *
 * `"false"` will be parsed as `false`.
 */
export class CheckboxRule extends BoolRule {
  sanitize(value: unknown) {
    // "false" string
    if (value === 'false') {
      return false
    }

    // Cast to boolean
    return !!value
  }
}
