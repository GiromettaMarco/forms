import { useTsvResolver } from '@gmcode/tsv-hookform'
import type { Ruleset, SanitizedValues, Schema } from '@gmcode/tsv-input'
import type { MessageParams } from '@gmcode/tsv-input'
import type {
  CancelTokenCallback,
  GlobalEventCallback,
  Method,
  Page,
  RequestPayload,
  SharedPageProps
} from '@inertiajs/core'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { useEffect, type SubmitEventHandler } from 'react'
import {
  type DefaultValues,
  type Path,
  type SubmitHandler,
  useForm as useReactForm
} from 'react-hook-form'

export type RouteDefinition<TMethod extends Method | Method[]> = {
  url: string
} & (TMethod extends Method[] ? { methods: TMethod } : { method: TMethod })

export interface ErrorData {
  message?: string
  params?: MessageParams
}

export function useForm<
  TRuleset extends Ruleset,
  TValues extends SanitizedValues<TRuleset>
>({
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
  route,
  schema,
  setDefaultsOnSuccess = false
}: {
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
  route: RouteDefinition<Method>
  schema: Schema<TRuleset>
  /**
   * Set the submitted values as default values on success.
   *
   * @defaultValue `false`
   */
  setDefaultsOnSuccess?: boolean
}) {
  const defaultValues = Object.fromEntries(
    Object.keys(schema.ruleset).map((field) => [field, defaults[field] ?? ''])
  )

  // React Hook Form
  const reactForm = useReactForm({
    defaultValues: defaultValues as DefaultValues<TValues>,
    resolver: useTsvResolver(schema)
  })

  // Inertia
  const inertiaForm = useInertiaForm(defaultValues as { [k: string]: string })

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
      onError,
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
        reactForm.setError(key as 'root' | Path<TValues>, {
          message: error,
          type: 'inertia'
        })
      }
    }
  }, [inertiaForm.errors, reactForm])

  return {
    errors: inertiaForm.errors,
    form: reactForm,
    loading: inertiaForm.processing,
    onSubmit: reactForm.handleSubmit(
      onSubmit as SubmitHandler<unknown>
    ) as SubmitEventHandler<HTMLFormElement>
  }
}
