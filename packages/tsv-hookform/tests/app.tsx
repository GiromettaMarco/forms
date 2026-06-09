import { useTsvResolver } from '@/index'
import { BasicRule, Message, Schema } from '@gmcode/tsv-core'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

class FooRule extends BasicRule {
  test(value: unknown): true | Message {
    if (value === 'foo') {
      return true
    }

    return new Message('This is not "foo"!')
  }
}

const schema = new Schema({
  foo: new FooRule()
})

export function App({
  shouldUseNativeValidation = false
}: {
  shouldUseNativeValidation?: boolean
}) {
  const [isValid, setIsValid] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues: { foo: '' },
    resolver: useTsvResolver(schema),
    shouldUseNativeValidation
  })

  function onSubmit() {
    setIsValid(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="foo"
        render={({ field, fieldState }) => (
          <div>
            <input
              data-testid="input"
              type="text"
              {...field}
            />

            {fieldState.error && (
              <span
                data-testid="error"
                role="alert"
              >
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />

      <div data-testid="log">{isValid ? 'Valid' : 'Invalid'}</div>

      <button
        data-testid="submit"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
