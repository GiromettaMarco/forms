import type { AdvancedRuleOptions, ParseEmpty } from '@/types'
import { Message, floatRegex, integerRegex } from '@gmcode/tsv-core'
import { AdvancedRule } from '@/advanced-rule'

interface Messages {
  integer: string
  maxValue: string
  minValue: string
  numeric: string
  required: string
  string: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvancedRuleOptions<Messages, O, PE> {
  /**
   * If true, the value must represent an integer.
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
 * Validate as a string representing a number.
 *
 * May be optional.
 */
export class NumericRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvancedRule<string, Messages, O, PE> {
  /**
   * If true, the value must represent an integer.
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
  messages

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
    optional,
    parseEmpty
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.integer = integer
    this.maxValue = maxValue
    this.minValue = minValue

    this.messages = Object.assign(
      {
        integer: 'integer',
        maxValue: 'maxValue',
        minValue: 'minValue',
        numeric: 'numeric',
        required: 'required',
        string: 'string'
      },
      messages
    )
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new Message(this.messages.required)
    }

    // Not string
    if (typeof value !== 'string') {
      return new Message(this.messages.string)
    }

    // Numeric (integer or float)
    if (this.integer) {
      if (!integerRegex.test(value)) {
        return new Message(this.messages.integer)
      }
    } else {
      if (!floatRegex.test(value)) {
        return new Message(this.messages.numeric)
      }
    }

    // Min value
    if (this.minValue !== null && Number(value) < this.minValue) {
      return new Message(this.messages.minValue, {
        min: this.minValue,
        value: value
      })
    }

    // Max value
    if (this.maxValue !== null && Number(value) > this.maxValue) {
      return new Message(this.messages.maxValue, {
        max: this.maxValue,
        value: value
      })
    }

    return true
  }
}
