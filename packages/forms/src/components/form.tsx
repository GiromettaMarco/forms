import { useForm, type RouteDefinition } from '@gmcode/inertia-hook-form'
import type {
  Ruleset,
  SanitizedValues,
  Schema
} from '@gmcode/inertia-hook-form/tsv'
import { cn, flash } from '@gmcode/react-ui'
import type {
  CancelTokenCallback,
  Errors,
  FormDataErrors,
  GlobalEventCallback,
  Method,
  RequestPayload
} from '@inertiajs/core'
import type { ComponentProps, ReactNode } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { ErrorMonitor } from '@/components/error-monitor'

type RenderFN<TValues extends FieldValues> = ({
  errors,
  form,
  loading
}: {
  errors: FormDataErrors<object>
  form: UseFormReturn<TValues>
  loading: boolean
}) => ReactNode

export function Form<
  TRuleset extends Ruleset,
  TValues extends SanitizedValues<TRuleset>
>({
  children,
  className,
  defaults = {},
  onBefore,
  onBeforeUpdate,
  onCancel,
  onCancelToken,
  onError,
  onFinish,
  onFlash,
  onPrefetched,
  onPrefetching,
  onProgress,
  onStart,
  onSuccess,
  preserveScroll = true,
  resetOnSuccess = true,
  rootError: displayRootError = 'flash',
  route,
  schema,
  setDefaultsOnSuccess = false,
  ...props
}: Omit<
  ComponentProps<'form'>,
  'action' | 'children' | 'method' | 'onSubmit'
> & {
  children: RenderFN<TValues>
  defaults?: Partial<TValues>
  onBefore?: GlobalEventCallback<'before', RequestPayload>
  onBeforeUpdate?: GlobalEventCallback<'beforeUpdate', RequestPayload>
  onCancel?: GlobalEventCallback<'cancel', RequestPayload>
  onCancelToken?: CancelTokenCallback
  onError?: GlobalEventCallback<'error', RequestPayload>
  onFinish?: GlobalEventCallback<'finish', RequestPayload>
  onFlash?: GlobalEventCallback<'flash', RequestPayload>
  onPrefetched?: GlobalEventCallback<'prefetched', RequestPayload>
  onPrefetching?: GlobalEventCallback<'prefetching', RequestPayload>
  onProgress?: GlobalEventCallback<'progress', RequestPayload>
  onStart?: GlobalEventCallback<'start', RequestPayload>
  onSuccess?: GlobalEventCallback<'success', RequestPayload>
  preserveScroll?: boolean
  /**
   * Reset input values to their defaults on success.
   *
   * @defaultValue `true`
   */
  resetOnSuccess?: boolean
  /**
   * How to display the root error from inertia.
   *
   * - `"flash"` - use the Toaster component
   * - `"monitor"` - use the ErrorMonitor component
   * - `"none"` - don't display the root error
   *
   * @defaultValue `"flash"`
   */
  rootError?: 'flash' | 'monitor' | 'none'
  route: RouteDefinition<Method>
  schema: Schema<TRuleset>
  /**
   * Set the submitted values as default values on success.
   *
   * @defaultValue `false`
   */
  setDefaultsOnSuccess?: boolean
}) {
  function onErrorWithToast(errors: Errors) {
    if (errors.root && displayRootError === 'flash') {
      flash({ level: 'error', title: errors.root })
    }

    if (onError) {
      onError(errors)
    }
  }

  const { errors, form, loading, onSubmit } = useForm({
    defaults,
    onBefore,
    onBeforeUpdate,
    onCancel,
    onCancelToken,
    onError: onErrorWithToast,
    onFinish,
    onFlash,
    onPrefetched,
    onPrefetching,
    onProgress,
    onStart,
    onSuccess,
    preserveScroll,
    resetOnSuccess,
    route,
    schema,
    setDefaultsOnSuccess
  })

  return (
    <form
      action={route.url}
      className={cn('grid gap-6', className)}
      method={route.method}
      onSubmit={onSubmit}
      {...props}
    >
      {children({
        errors,
        form,
        loading
      })}

      {displayRootError === 'monitor' && (
        <ErrorMonitor error={{ message: errors.root }} />
      )}
    </form>
  )
}
