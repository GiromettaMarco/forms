import { Message } from '@gmcode/tsv-core'
import { AdvancedRule } from '@/advanced-rule'
import type { AdvancedRuleOptions, ParseEmpty } from '@/types'

interface Messages {
  array: string
  required: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvancedRuleOptions<Messages, O, PE> {
  /**
   * If set, converts the string to an array by splitting it according to the specified token.
   *
   * @defaultValue `undefined`
   */
  splitStringBy?: string
}

/**
 * Validate as array.
 *
 * May be optional.
 */
export class ArrayRule<
  TItem = unknown,
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'undefined'
> extends AdvancedRule<Array<TItem>, Messages, O, PE> {
  /**
   * Error messages.
   */
  messages

  /**
   * If set, converts the string to an array by splitting it according to the specified token.
   *
   * @defaultValue `undefined`
   */
  splitStringBy?: string

  constructor({
    messages,
    optional,
    parseEmpty,
    splitStringBy
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.splitStringBy = splitStringBy

    this.messages = Object.assign(
      {
        array: 'array',
        required: 'required'
      },
      messages
    )
  }

  sanitize(value: unknown) {
    const trimmed = super.sanitize(value)

    if (this.splitStringBy && typeof trimmed === 'string' && trimmed) {
      return trimmed.split(this.splitStringBy)
    }

    return trimmed
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new Message(this.messages.required)
    }

    // Not array
    if (!Array.isArray(value)) {
      return new Message(this.messages.array)
    }

    return true
  }
}
