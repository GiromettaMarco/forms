import { InputTextRule, Schema } from '@gmcode/tsv-input'
import type {
  CancelTokenCallback,
  GlobalEventCallback,
  RequestPayload
} from '@inertiajs/core'
import { Controller } from 'react-hook-form'
import { useForm } from '@/use-form'
import { formRoute } from '../mocks/routes'

const schema = new Schema({
  name: new InputTextRule(),
  type: new InputTextRule({ optional: true })
})

export function Form({
  defaults,
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
  preserveScroll,
  resetOnSuccess,
  setDefaultsOnSuccess,
  ...props
}: {
  defaults?: { [k: string]: string }
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
   * Set the submitted values as default values on success.
   *
   * @defaultValue `false`
   */
  setDefaultsOnSuccess?: boolean
}) {
  const { errors, form, loading, onSubmit } = useForm({
    defaults,
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
    preserveScroll,
    resetOnSuccess,
    route: formRoute,
    schema,
    setDefaultsOnSuccess
  })
  return (
    <form
      action={formRoute.url}
      method={formRoute.method}
      onSubmit={onSubmit}
      {...props}
    >
      <label htmlFor="name">Name:</label>
      <br />
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <>
            <input
              id="name"
              {...field}
            />
            <p>{fieldState.error?.message}</p>
          </>
        )}
      />

      <label htmlFor="type">Type:</label>
      <br />
      <Controller
        control={form.control}
        name="type"
        render={({ field, fieldState }) => (
          <>
            <input
              id="type"
              {...field}
            />
            <p>{fieldState.error?.message}</p>
          </>
        )}
      />

      <button
        disabled={loading}
        type="submit"
      >
        Submit
      </button>
      <button
        onClick={() => form.reset()}
        type="reset"
      >
        Reset
      </button>
      <br />

      <p>{errors.root}</p>
    </form>
  )
}
