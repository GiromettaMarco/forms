import { Message } from '@gmcode/tsv-core'
import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'

interface Messages {
  date: string
  required: string
}

/**
 * Value must be a javascript `Date` object or it must produce a valid date
 * through the `Date()` constructor.
 *
 * May be optional.
 */
export class DateRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvancedRule<Date, Messages, O, PE> {
  /**
   * Error messages.
   */
  messages

  constructor(options?: AdvancedRuleOptions<Messages, O, PE>) {
    super(options)

    this.parseEmpty = options?.parseEmpty ?? 'string'

    this.messages = Object.assign(
      {
        date: 'date',
        required: 'required'
      },
      options?.messages
    )
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new Message(this.messages.required)
    }

    // Date
    if (value instanceof Date) {
      if (isNaN(value.valueOf())) {
        return new Message(this.messages.date)
      }

      return true
    }

    // String or number
    if (typeof value === 'string' || typeof value === 'number') {
      const newDate = new Date(value)

      if (isNaN(newDate.valueOf())) {
        return new Message(this.messages.date)
      }

      return true
    }

    // Everything else
    return new Message(this.messages.date)
  }
}
