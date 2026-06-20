import type {
  Resolver,
  ResolverError,
  ResolverOptions,
  ResolverSuccess
} from 'react-hook-form'
import type {
  Ruleset,
  SanitizedValues,
  Schema,
  SchemaValues
} from '@gmcode/tsv-core'
import { toNestErrors, validateFieldsNatively } from '@hookform/resolvers'

/**
 * Custom hook to generate a validation resolver for React Hook Form.
 *
 * @param schema A tsv Schema instance
 */
export function useTsvResolver<
  R extends Ruleset,
  Input extends SchemaValues<R>,
  Context,
  Output
>(schema: Schema<R>): Resolver<Input, Context, Input | Output> {
  // Resolver
  return (values: Input, context: unknown, options: ResolverOptions<Input>) => {
    const { errors, sanitized, success } = schema.validate(values)

    if (options.shouldUseNativeValidation) {
      validateFieldsNatively({}, options)
    }

    if (success) {
      return {
        errors: {},
        values: sanitized as Output
      } satisfies ResolverSuccess<Output>
    }

    return {
      errors: toNestErrors(
        Object.fromEntries(
          Object.entries(errors).map(([key, message]) => [
            key,
            {
              message: message.text,
              params: message.params,
              type: 'tsv'
            }
          ])
        ),
        options
      ),
      values: {}
    } satisfies ResolverError<Input>
  }
}

/**
 * Infer sanitized and validated data type from a tsv Schema.
 */
export type InferSchema<T> =
  T extends Schema<infer R> ? SanitizedValues<R> : never
