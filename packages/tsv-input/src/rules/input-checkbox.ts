import { InputRule, type inputRuleMessages } from '@/rules/input-rule'

interface InputCheckboxOptions {
  /**
   * Error messages.
   */
  messages?: Partial<typeof inputRuleMessages>

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `true`
   */
  optional?: boolean
}

/**
 * Validation for an HTML checkbox field.
 *
 * Converts any value to a string and is optional by default.
 */
export class InputCheckboxRule extends InputRule {
  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `true`
   */
  optional: boolean

  constructor({ messages, optional = true }: InputCheckboxOptions = {}) {
    super({ messages })

    this.optional = optional
  }
}
