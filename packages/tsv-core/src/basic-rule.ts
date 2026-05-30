import { Message } from '@/message.ts'

/**
 * Validation rule base class.
 */
export abstract class BasicRule<S = unknown> {
  /**
   * Manipulate value before testing.
   */
  sanitize?(value: unknown): unknown

  /**
   * Validation function.
   *
   * @returns `true` if the validation is passed or a `Message` object in case of error.
   */
  abstract test(value: unknown): true | Message

  /**
   * Sanitize and validate the value with error messages.
   */
  validate(value: unknown) {
    // Sanitize
    const sanitized = this.sanitize ? this.sanitize(value) : value

    // Test
    const message = this.test(sanitized)

    // Success
    if (message === true) {
      return {
        sanitized: sanitized as S,
        success: true as const
      }
    }

    // Error
    return {
      message,
      success: false as const
    }
  }
}
