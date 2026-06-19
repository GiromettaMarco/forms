import {
  InputRule,
  type InputRuleOptions,
  inputRuleMessages
} from '@/input-rule'
import { Message, hexColorRegex } from '@gmcode/tsv-core'

const defaultMessages = {
  ...inputRuleMessages,
  color: 'color'
}

/**
 * Validation for an HTML input color field.
 */
export class InputColorRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  constructor({
    messages,
    optional
  }: InputRuleOptions<TOptional, typeof defaultMessages> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    // Hex color regex
    if (!hexColorRegex.test(value)) {
      return new Message(this.messages.color)
    }

    return true
  }
}
