import type {
  CancelTokenCallback,
  Errors,
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
import { type InferSchema, useTsvResolver } from '@gmcode/tsv-hookform'
import { type ReactNode, useEffect } from 'react'
import { cn, flash } from '@gmcode/react-ui'
import type { Ruleset } from '@gmcode/tsv-core'
import type { Schema } from '@gmcode/tsv-input'
import { useForm as useInertiaForm } from '@inertiajs/react'
import { useForm as userReactForm } from 'react-hook-form'

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

export type RouteDefinition<TMethod extends Method | Method[]> = {
  url: string
} & (TMethod extends Method[] ? { methods: TMethod } : { method: TMethod })

type RenderFN<TValues extends FieldValues> = ({
  form,
  loading
}: {
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
  flashRootErrors = true,
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
   * Display root errors using the Toast component.
   *
   * @defaultValue `true`
   */
  flashRootErrors?: boolean
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
    if (errors.root && flashRootErrors) {
      flash({ level: 'error', title: errors.root })
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
    <form
      action={route.url}
      className={cn('grid gap-6', className)}
      method={route.method}
      onSubmit={reactForm.handleSubmit(onSubmit)}
    >
      {children({
        form: reactForm,
        loading: inertiaForm.processing
      })}
    </form>
  )
}
