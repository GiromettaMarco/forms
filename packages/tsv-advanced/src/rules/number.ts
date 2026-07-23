import { Message } from '@gmcode/tsv-core'
import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'

interface Messages {
  integer: string
  maxValue: string
  minValue: string
  number: string
  required: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvancedRuleOptions<Messages, O, PE> {
  /**
   * Whether the number must be an integer.
   *
   * @defaultValue `false`
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

  /**
   * If true, value will be parsed as an integer (rounded down).
   *
   * @defaultValue `true`
   */
  parseInt?: boolean

  /**
   * Convert strings to numbers.
   *
   * @defaultValue `false`
   */
  parseNumber?: boolean
}

/**
 * Validate as number.
 *
 * May be optional.
 */
export class NumberRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvancedRule<number, Messages, O, PE> {
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

  /**
   * Whether the number must be an integer.
   *
   * @defaultValue `false`
   */
  integer: boolean

  /**
   * If true, value will be parsed as an integer (rounded down).
   *
   * @defaultValue `true`
   */
  parseInt: boolean

  /**
   * Convert strings to numbers.
   *
   * @defaultValue `false`
   */
  parseNumber: boolean

  constructor({
    integer = false,
    maxValue = null,
    messages,
    minValue = 0,
    optional,
    parseEmpty,
    parseInt = false,
    parseNumber = false
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.maxValue = maxValue
    this.minValue = minValue
    this.integer = integer
    this.parseInt = parseInt
    this.parseNumber = parseNumber

    this.messages = Object.assign(
      {
        integer: 'integer',
        maxValue: 'maxValue',
        minValue: 'minValue',
        number: 'number',
        required: 'required'
      },
      messages
    )
  }

  sanitize(value: unknown) {
    // Parent sanitize
    const parsedValue = super.sanitize(value)

    // Parse int
    if (this.parseInt) {
      if (typeof parsedValue === 'number') {
        return Math.floor(parsedValue)
      }

      if (parsedValue && typeof parsedValue === 'string') {
        return parseInt(parsedValue)
      }
    }

    // Parse number
    if (this.parseNumber && parsedValue && typeof parsedValue === 'string') {
      return Number(parsedValue)
    }

    return parsedValue
  }

  test(value: unknown) {
    // Null, undefined and empty string
    if (value === undefined || value === null || value === '') {
      if (this.optional) {
        return true
      }

      return new Message(this.messages.required)
    }

    // Not number
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return new Message(this.messages.number)
    }

    // Min value
    if (this.minValue !== null && value < this.minValue) {
      return new Message(this.messages.minValue, {
        min: this.minValue,
        value: value
      })
    }

    // Max value
    if (this.maxValue !== null && value > this.maxValue) {
      return new Message(this.messages.maxValue, {
        max: this.maxValue,
        value: value
      })
    }

    // Not integer
    if (this.integer && !Number.isInteger(value)) {
      return new Message(this.messages.integer)
    }

    return true
  }
}
