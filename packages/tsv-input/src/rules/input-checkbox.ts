import { InputRule, type inputRuleMessages } from '@/input-rule'

type OptionalDefaultTrue<TOptional extends boolean | undefined> =
  TOptional extends false ? false : true | undefined

interface RuleOptions<
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
   * @defaultValue `true`
   */
  optional?: TOptional
}

/**
 * Validation for an HTML checkbox field.
 *
 * Converts any value to a string and is optional by default.
 */
export class InputCheckboxRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<OptionalDefaultTrue<TOptional>> {
  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `true`
   */
  optional: boolean

  constructor({ messages, optional = true }: RuleOptions<TOptional> = {}) {
    super({ messages })

    this.optional = optional
  }
}
