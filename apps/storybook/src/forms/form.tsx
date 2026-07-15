import {
  Form as FormOriginal,
  type Ruleset,
  type SanitizedValues,
  type Schema
} from '@gmcode/forms'
import type { ComponentProps } from 'react'

/**
 * Infer sanitized and validated data type from a tsv Schema.
 */
type InferSchema<T> = T extends Schema<infer R> ? SanitizedValues<R> : never

export function Form<
  TRuleset extends Ruleset,
  TSchema extends Schema<TRuleset>,
  TValues extends InferSchema<TSchema>
>(props: ComponentProps<typeof FormOriginal<TRuleset, TSchema, TValues>>) {
  return <FormOriginal {...props} />
}
