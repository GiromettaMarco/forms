import {
  InputRule,
  type InputRuleOptions,
  inputRuleMessages
} from '@/rules/input-rule'
import { Message, emailRegex } from '@gmcode/tsv-core'

const defaultMessages = {
  ...inputRuleMessages,
  email: 'email',
  maxChars: 'maxChars'
}

interface InputEmailOptions<
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null
}

/**
 * Validation for an HTML input email field.
 */
export class InputEmailRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars: number | null

  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  constructor({
    maxChars = 255,
    messages,
    optional
  }: InputEmailOptions<TOptional> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.maxChars = maxChars
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
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
