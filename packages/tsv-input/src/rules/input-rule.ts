import { BasicRule, Message } from '@gmcode/tsv-core'

export const inputRuleMessages = {
  required: 'required'
}

export interface InputRuleOptions<
  TMessages extends typeof inputRuleMessages = typeof inputRuleMessages
> {
  /**
   * Error messages.
   */
  messages?: Partial<TMessages>

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `false`
   */
  optional?: boolean
}

/**
 * Preset class for form field validation rules.
 */
export class InputRule extends BasicRule<string> {
  /**
   * Error messages.
   */
  messages: typeof inputRuleMessages

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `false`
   */
  optional: boolean

  constructor({ messages, optional = false }: InputRuleOptions = {}) {
    super()

    this.messages = { ...inputRuleMessages, ...messages }

    this.optional = optional
  }

  sanitize(value: unknown): string {
    // oxlint-disable-next-line typescript/no-base-to-string
    return value ? String(value).trim() : ''
  }

  test(value: string): true | Message {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    return true
  }

  protected isFalsyResponse() {
    return this.optional ? true : new Message(this.messages.required)
  }
}
