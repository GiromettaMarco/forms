import type {
  CancelTokenCallback,
  Errors,
  FormDataErrors,
  GlobalEventCallback,
  Page,
  RequestPayload,
  SharedPageProps
} from '@inertiajs/core'
import type {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReturn
} from 'react-hook-form'
import type { ErrorData, Method, RouteDefinition } from '@/types'
import { type InferSchema, useTsvResolver } from '@gmcode/tsv-hookform'
import { type ReactNode, useEffect, useState } from 'react'
import { cn, flash } from '@gmcode/react-ui'
import { ErrorMonitor } from '@/components/error-monitor'
import { I18nextProvider } from 'react-i18next'
import type { Ruleset } from '@gmcode/tsv-core'
import type { Schema } from '@/index'
import i18n from '@/i18n'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { useForm as userReactForm } from 'react-hook-form'

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
  TSchema extends Schema<TRuleset>,
  TValues extends InferSchema<TSchema>
>({
  children,
  className,
  defaults = {},
  rootError: displayRootError = 'flash',
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
  route,
  schema,
  setDefaultsOnSuccess = false
}: {
  children: RenderFN<TValues>
  className?: string
  defaults?: Partial<DefaultValues<TValues>>
  /**
   * How to display the root error from inertia.
   *
   * - `flash` - use the Toast component
   * - `monitor` - use the ErrorMonitor component
   * - `none` - don't display the root error
   *
   * @defaultValue `flash`
   */
  rootError?: 'flash' | 'monitor' | 'none'
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
  resetOnSuccess?: boolean
  route: RouteDefinition<Method>
  schema: Schema<TRuleset>
  setDefaultsOnSuccess?: boolean
}) {
  const [rootError, setRootError] = useState<ErrorData>()

  const defaultValues = Object.fromEntries(
    Object.keys(schema.ruleset).map((field) => [field, defaults[field] ?? ''])
  ) as DefaultValues<TValues>

  // React Hook Form
  const reactForm = userReactForm<TValues>({
    defaultValues,
    resolver: useTsvResolver(schema)
  })

  // Inertia
  const inertiaForm = useInertiaForm<object>(defaultValues)

  function onErrorWithToast(errors: Errors) {
    if (errors.root) {
      if (displayRootError === 'flash') {
        flash({ level: 'error', title: errors.root })
      } else if (displayRootError === 'monitor') {
        setRootError({ message: errors.root })
      }
    }

    if (onError) {
      onError(errors)
    }
  }

  function onSuccessWithReset(page: Page<SharedPageProps>) {
    if (setDefaultsOnSuccess) {
      inertiaForm.setDefaults()
      reactForm.reset(reactForm.getValues())
    }

    if (resetOnSuccess) {
      inertiaForm.reset()
      reactForm.reset()
    }

    if (onSuccess) {
      onSuccess(page)
    }
  }

  // Submit handler
  function onSubmit(values: TValues) {
    inertiaForm.transform(() => values)
    inertiaForm[route.method](route.url, {
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
      onSuccess: onSuccessWithReset,
      preserveScroll
    })
  }

  // Add inertia (server) errors to react form.
  useEffect(() => {
    for (const [key, error] of Object.entries(inertiaForm.errors)) {
      if (error) {
        reactForm.setError(key as Path<TValues>, {
          message: error as string,
          type: 'inertia'
        })
      }
    }
  }, [inertiaForm.errors, reactForm])

  return (
    <I18nextProvider i18n={i18n}>
      <form
        action={route.url}
        className={cn('grid gap-6', className)}
        method={route.method}
        onSubmit={reactForm.handleSubmit(onSubmit)}
      >
        <>
          {children({
            errors: inertiaForm.errors,
            form: reactForm,
            loading: inertiaForm.processing
          })}
        </>

        {displayRootError === 'monitor' && <ErrorMonitor error={rootError} />}
      </form>
    </I18nextProvider>
  )
}
