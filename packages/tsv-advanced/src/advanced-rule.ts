import type {
  AdvancedRuleOptions,
  AdvancedSanitized,
  ParseEmpty
} from '@/types'
import { BasicRule } from '@gmcode/tsv-core'

/**
 * Preset class for advanced validation rules.
 */
export abstract class AdvancedRule<
  S,
  M extends object,
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends BasicRule<AdvancedSanitized<S, O, PE>> {
  /**
   * Error messages.
   */
  abstract messages: M

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `false`
   */
  optional: boolean

  /**
   * Convert null, undefined and empty strings.
   *
   * @defaultValue `"string"`
   */
  parseEmpty: ParseEmpty

  constructor(options?: AdvancedRuleOptions<M, O, PE>) {
    super()

    this.optional = !!options?.optional

    this.parseEmpty = options?.parseEmpty ?? 'string'
  }

  sanitize(value: unknown) {
    // Trim string
    const parsedValue = typeof value === 'string' ? value.trim() : value

    // Parse empty
    if (
      parsedValue === null ||
      parsedValue === undefined ||
      parsedValue === ''
    ) {
      switch (this.parseEmpty) {
        case 'null':
          return null

        case 'string':
          return ''

        case 'undefined':
          return undefined

        default:
          return parsedValue
      }
    }

    // Unknown
    return parsedValue
  }
}
