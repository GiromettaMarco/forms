import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'
import { Message } from '@gmcode/tsv-core'

interface Messages {
  array: string
  required: string
}

type RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> = AdvancedRuleOptions<Messages, O, PE>

/**
 * Validate as array.
 *
 * May be optional.
 */
export class ArrayRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'undefined'
> extends AdvancedRule<Array<string>, Messages, O, PE> {
  /**
   * Error messages.
   */
  messages

  constructor(options?: RuleOptions<O, PE>) {
    super(options)

    this.messages = Object.assign(
      {
        array: 'array',
        required: 'required'
      },
      options?.messages
    )
  }

  sanitize(value: unknown) {
    const trimmed = super.sanitize(value)

    if (typeof trimmed === 'string' && trimmed) {
      return trimmed.split(',')
    }

    return trimmed
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new Message(this.messages.required)
    }

    // Not array
    if (!Array.isArray(value)) {
      return new Message(this.messages.array)
    }

    return true
  }
}
