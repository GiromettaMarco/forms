import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'
import { Message } from '@gmcode/tsv-core'

interface Messages {
  missing: string
  required: string
}

/**
 * Validate as on of a set of values.
 *
 * May be optional.
 */
export class OneOfRule<
  const TItems,
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvancedRule<TItems, Messages, O, PE> {
  /**
   * Accepted values.
   */
  acceptedValues: TItems[]

  /**
   * Error messages.
   */
  messages: Messages

  constructor(
    acceptedValues: TItems[],
    options?: AdvancedRuleOptions<Messages, O, PE>
  ) {
    super(options)

    this.acceptedValues = acceptedValues

    this.messages = Object.assign(
      {
        missing: 'missing',
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

    // Missing in array
    if (!this.acceptedValues.includes(value as TItems)) {
      return new Message(this.messages.missing)
    }

    return true
  }
}
