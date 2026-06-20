import { BasicRule, Message } from '@gmcode/tsv-core'

export const inputRuleMessages = {
  required: 'required'
}

export type InputRuleSanitized<TOptional extends boolean | undefined> =
  TOptional extends true ? string | null : string

export interface InputRuleOptions<
  TOptional extends boolean | undefined,
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
  optional?: TOptional
}

/**
 * Preset class for form field validation rules.
 */
export class InputRule<
  TOptional extends boolean | undefined = undefined
> extends BasicRule<InputRuleSanitized<TOptional>> {
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

  constructor({
    messages,
    optional = false
  }: InputRuleOptions<TOptional> = {}) {
    super()

    this.messages = { ...inputRuleMessages, ...messages }

    this.optional = optional
  }

  sanitize(value: unknown): string | null {
    // oxlint-disable-next-line typescript/no-base-to-string
    return value ? String(value).trim() : null
  }

  test(value: string | null): true | Message {
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
