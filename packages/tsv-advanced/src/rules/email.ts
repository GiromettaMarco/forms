import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'
import { emailRegex, Message } from '@gmcode/tsv-core'

interface Messages {
  email: string
  maxChars: string
  required: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvancedRuleOptions<Messages, O, PE> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null
}

/**
 * Must be a valid email address.
 *
 * May be optional.
 */
export class EmailRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvancedRule<string, Messages, O, PE> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars: number | null

  /**
   * Error messages.
   */
  messages

  constructor({
    maxChars = 255,
    messages,
    optional,
    parseEmpty
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.maxChars = maxChars

    this.messages = Object.assign(
      {
        email: 'email',
        maxChars: 'maxChars',
        required: 'required'
      },
      messages
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

    // Not string
    if (typeof value !== 'string') {
      return new Message(this.messages.email)
    }

    // Char limit
    if (this.maxChars !== null && value.length > this.maxChars) {
      return new Message(this.messages.maxChars, {
        length: value.length,
        max: this.maxChars
      })
    }

    // Email regex
    if (!emailRegex.test(value)) {
      return new Message(this.messages.email)
    }

    return true
  }
}
