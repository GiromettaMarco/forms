import { Message } from '@gmcode/tsv-core'
import { isHexColor } from '@gmcode/tsv-core/regex'
import {
  InputRule,
  type InputRuleOptions,
  inputRuleMessages
} from '@/rules/input-rule'

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
    if (!isHexColor.test(value)) {
      return new Message(this.messages.color)
    }

    return true
  }
}
