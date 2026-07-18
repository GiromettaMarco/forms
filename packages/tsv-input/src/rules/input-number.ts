import {
  InputRule,
  type InputRuleOptions,
  inputRuleMessages
} from '@/rules/input-rule'
import { Message } from '@gmcode/tsv-core'

const defaultMessages = {
  ...inputRuleMessages,
  integer: 'integer',
  maxValue: 'maxValue',
  minValue: 'minValue',
  number: 'number'
}

interface InputNumberOptions<
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * If true, value must be an integer.
   *
   * @defaultValue `true`
   */
  integer?: boolean

  /**
   * Maximum value. `null` for no check.
   *
   * @defaultValue `null`
   */
  maxValue?: number | null

  /**
   * Minimum value. `null` for no check.
   *
   * @defaultValue `0`
   */
  minValue?: number | null
}

/**
 * Validation for an HTML input number field.
 */
export class InputNumberRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * If true, value must be an integer.
   *
   * @defaultValue `true`
   */
  integer: boolean

  /**
   * Maximum value. `null` for no check.
   *
   * @defaultValue `null`
   */
  maxValue: number | null

  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  /**
   * Minimum value. `null` for no check.
   *
   * @defaultValue `0`
   */
  minValue: number | null

  constructor({
    integer = true,
    maxValue = null,
    messages,
    minValue = 0,
    optional
  }: InputNumberOptions<TOptional> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.integer = integer
    this.maxValue = maxValue
    this.minValue = minValue
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    const number = Number(value)

    // Not number
    if (Number.isNaN(number)) {
      return new Message(this.messages.number)
    }

    // Min value
    if (this.minValue !== null && number < this.minValue) {
      return new Message(this.messages.minValue, {
        min: this.minValue,
        value: number
      })
    }

    // Max value
    if (this.maxValue !== null && number > this.maxValue) {
      return new Message(this.messages.maxValue, {
        max: this.maxValue,
        value: number
      })
    }

    // Not integer
    if (this.integer && !Number.isInteger(number)) {
      return new Message(this.messages.integer)
    }

    return true
  }
}
