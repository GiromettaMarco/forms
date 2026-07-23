import { Message } from '@gmcode/tsv-core'
import {
  InputRule,
  type InputRuleOptions,
  inputRuleMessages
} from '@/rules/input-rule'

const defaultMessages = {
  ...inputRuleMessages,
  missing: 'missing'
}

interface InputSelectOptions<
  TValue extends string,
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * Accepted values.
   */
  options: Array<TValue>
}

/**
 * Validation for an HTML input select field.
 */
export class InputSelectRule<
  TOptions extends string,
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  /**
   * Accepted values.
   */
  options: Array<TOptions>

  constructor({
    messages,
    optional,
    options
  }: InputSelectOptions<TOptions, TOptional>) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.options = options
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    // Options (missing in array)
    if (!this.options.includes(value as TOptions)) {
      return new Message(this.messages.missing)
    }

    return true
  }
}
