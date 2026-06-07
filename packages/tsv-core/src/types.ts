import type { BasicRule } from '@/basic-rule'
import type { Message } from '@/message'

export type Ruleset = Record<string, BasicRule>

export type Sanitized<T> = T extends BasicRule<infer S> ? S : never

export type SanitizedValues<T extends Ruleset> = {
  [R in keyof T]: Sanitized<T[R]>
}

export type ResultSuccess<T extends Ruleset> = {
  errors?: never
  sanitized: { [R in keyof T]: Sanitized<T[R]> }
  success: true
}

export type ResultError<T extends Ruleset> = {
  errors: { [P in keyof T]: Message }
  sanitized?: never
  success: false
}

export type ValidationResult<T extends Ruleset> =
  | ResultSuccess<T>
  | ResultError<T>

export type SchemaValues<T extends Ruleset> = Record<keyof T, unknown>

export interface SchemaRule<T extends Ruleset> {
  addTo: keyof T
  callback: (values: SanitizedValues<T>) => true | Message
}

export interface SchemaOptions<T extends Ruleset> {
  /**
   * A set of additional rules, defined at schema level.
   *
   * Executed only if Ruleset validations pass.
   */
  postValidation?: SchemaRule<T>[]
}

export interface MessageParams {
  [key: string]: number | string
}
