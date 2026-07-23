import { Message } from '@gmcode/tsv-core'
import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'

interface Messages {
  maxChars: string
  minChars: string
  required: string
  string: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvancedRuleOptions<Messages, O, PE> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null

  /**
   * Minimum string length. `null` for no check.
   *
   * @defaultValue `null`
   */
  minChars?: number | null

  /**
   * Convert numbers to strings.
   *
   * @defaultValue `false`
   */
  parseNumber?: boolean
}

/**
 * Validate as text.
 *
 * May be optional.
 */
export class TextRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvancedRule<string, Messages, O, PE> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars: number | null

  /**
   * Error messages.
   */
  messages

  /**
   * Minimum string length. `null` for no check.
   *
   * @defaultValue `null`
   */
  minChars: number | null

  /**
   * Convert numbers to strings.
   *
   * @defaultValue `false`
   */
  parseNumber: boolean

  constructor({
    maxChars = 255,
    messages,
    minChars = null,
    optional,
    parseEmpty,
    parseNumber = false
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.maxChars = maxChars
    this.minChars = minChars
    this.parseNumber = parseNumber

    this.messages = Object.assign(
      {
        maxChars: 'maxChars',
        minChars: 'minChars',
        required: 'required',
        string: 'string'
      },
      messages
    )
  }

  sanitize(value: unknown) {
    // Number
    if (this.parseNumber && typeof value === 'number') {
      return value.toString()
    }

    return super.sanitize(value)
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
