import { Form, InputTextRule, Schema, Submit, TextField } from '@/index'
import { expect, vi } from 'vite-plus/test'
import {
  formRoute,
  inertiaResponseError,
  inertiaResponseSuccess,
  test
} from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onError = vi.fn()
const onSuccess = vi.fn()

function FormAndSchema({
  resetOnSuccess,
  rootError,
  setDefaultsOnSuccess
}: {
  resetOnSuccess?: boolean
  rootError?: 'flash' | 'monitor' | 'none'
  setDefaultsOnSuccess?: boolean
}) {
  const schema = new Schema({
    name: new InputTextRule({ maxChars: 20, minChars: 4 })
  })

  return (
    <Form
      className="w-72"
      defaults={{ name: '' }}
      onError={onError}
      onSuccess={onSuccess}
      schema={schema}
      resetOnSuccess={resetOnSuccess}
      rootError={rootError}
      route={formRoute}
      setDefaultsOnSuccess={setDefaultsOnSuccess}
    >
      {({ form, loading }) => (
        <>
          <TextField
            control={form.control}
            inputName="name"
            label="Name"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('Form component', async ({ worker }) => {
  // Add rest handler
  worker.use(inertiaResponseError)

  // Wrap with Toaster component
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  const input = screen.getByLabelText('Name')

  // Test client side validation
  await input.fill('Jim')
  await screen.getByText('Submit').click()
  expect(
    screen.getByText('The field must be at least 4 characters.')
  ).toBeInTheDocument()

  // Submit the form
  await input.fill('John')
  await screen.getByText('Submit').click()

  // Test server output
  const toast = await vi.waitFor(async () => {
    const element = screen
      .getByText('These credentials do not match our records.')
      .element()
    expect(element).toBeTruthy()
    return element
  })
  expect(toast).toBeInstanceOf(HTMLElement)
  expect(onError).toHaveBeenCalledOnce()
})

test('Form component with inline root errors', async ({ worker }) => {
  // Add rest handler
  worker.use(inertiaResponseError)

  // Wrap with Toaster component
  const screen = await render(<FormAndSchema rootError="monitor" />, {
    wrapper: WithToaster
  })

  // Submit the form
  await screen.getByLabelText('Name').fill('John')
  await screen.getByText('Submit').click()

  // Test server output
  const toast = await vi.waitFor(async () => {
    const element = screen
      .getByText('These credentials do not match our records.')
      .element()
    expect(element).toBeTruthy()
    return element
  })
  expect(toast).toBeInstanceOf(HTMLElement)
  expect(onError).toHaveBeenCalledOnce()
})

test('Form component without reset on success', async ({ worker }) => {
  // Add rest handler
  worker.use(inertiaResponseSuccess)

  // Wrap with Toaster component
  const screen = await render(<FormAndSchema resetOnSuccess={false} />, {
    wrapper: WithToaster
  })

  const input = screen.getByLabelText('Name')

  // Submit the form
  await input.fill('John')
  await screen.getByText('Submit').click()

  // Test new defaults
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
  expect(input).toHaveValue('John')
})

test('Form component with set defaults on success', async ({ worker }) => {
  // Add rest handler
  worker.use(inertiaResponseSuccess)

  // Wrap with Toaster component
  const screen = await render(<FormAndSchema setDefaultsOnSuccess />, {
    wrapper: WithToaster
  })

  const input = screen.getByLabelText('Name')

  // Submit the form
  await input.fill('John')
  await screen.getByText('Submit').click()

  // Test new defaults
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
  expect(input).toHaveValue('John')
})
