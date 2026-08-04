import { Message } from '@gmcode/tsv-core'
import { hasMixedCase, hasNumber, hasSymbol } from '@gmcode/tsv-core/regex'
import {
  InputRule,
  type InputRuleOptions,
  inputRuleMessages
} from '@/rules/input-rule'

const defaultMessages = {
  ...inputRuleMessages,
  hasMixed: 'hasMixed',
  hasNumber: 'hasNumber',
  hasSymbol: 'hasSymbol',
  maxChars: 'maxChars',
  minChars: 'minChars'
}

interface InputPasswordOptions<
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * Require at least one uppercase and one lowercase letter.
   *
   * @defaultValue `true`
   */
  hasMixed?: boolean

  /**
   * Require at least one number.
   *
   * @defaultValue `true`
   */
  hasNumber?: boolean

  /**
   * Require at least one symbol.
   *
   * @defaultValue `true`
   */
  hasSymbol?: boolean

  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null

  /**
   * Minimum string length. `null` for no check.
   *
   * @defaultValue `12`
   */
  minChars?: number | null
}

/**
 * Validation for an HTML input password field.
 */
export class InputPasswordRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Require at least one uppercase and one lowercase letter.
   *
   * @defaultValue `true`
   */
  hasMixed: boolean

  /**
   * Require at least one number.
   *
   * @defaultValue `true`
   */
  hasNumber: boolean

  /**
   * Require at least one symbol.
   *
   * @defaultValue `true`
   */
  hasSymbol: boolean

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

  /**
   * Minimum string length. `null` for no check.
   *
   * @defaultValue `12`
   */
  minChars: number | null

  constructor({
    hasMixed = true,
    hasNumber = true,
    hasSymbol = true,
    maxChars = 255,
    messages,
    minChars = 12,
    optional
  }: InputPasswordOptions<TOptional> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.hasMixed = hasMixed
    this.hasNumber = hasNumber
    this.hasSymbol = hasSymbol
    this.maxChars = maxChars
    this.minChars = minChars
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    // Has mixed
    if (this.hasMixed && !hasMixedCase.test(value)) {
      return new Message(this.messages.hasMixed)
    }

    // Has number
    if (this.hasNumber && !hasNumber.test(value)) {
      return new Message(this.messages.hasNumber)
    }

    // Has symbol
    if (this.hasSymbol && !hasSymbol.test(value)) {
      return new Message(this.messages.hasSymbol)
    }

    // Min chars
    if (this.minChars !== null && value.length < this.minChars) {
      return new Message(this.messages.minChars, {
        length: value.length,
        min: this.minChars
      })
    }

    // Max chars
    if (this.maxChars !== null && value.length > this.maxChars) {
      return new Message(this.messages.maxChars, {
        length: value.length,
        max: this.maxChars
      })
    }

    return true
  }
}
