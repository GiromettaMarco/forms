export type ParseEmpty = 'null' | 'string' | 'unchanged' | 'undefined'

export type AdvancedSanitized<
  T,
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> = O extends true
  ? PE extends 'undefined'
    ? T | undefined
    : PE extends 'null'
      ? T | null
      : PE extends 'string'
        ? T | ''
        : T | undefined | null
  : T

export interface AdvancedRuleOptions<
  M extends object,
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> {
  /**
   * Error messages.
   */
  messages?: Partial<M>

  /**
   * If true, falsy values will pass validation.
   *
   * @defaultValue `false`
   */
  optional?: O

  /**
   * Convert `null`, `undefined` and empty strings.
   *
   * @defaultValue `"string"`
   */
  parseEmpty?: PE
}
