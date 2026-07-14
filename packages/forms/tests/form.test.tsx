import { Form, InputTextRule, Schema, Submit, TextField } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseError, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

function FormAndSchema({
  rootError
}: {
  rootError?: 'flash' | 'monitor' | 'none'
}) {
  const schema = new Schema({
    username: new InputTextRule({
      maxChars: 20,
      messages: {
        maxChars: 'username.maxChars',
        minChars: 'username.minChars',
        required: 'username.required'
      },
      minChars: 4
    })
  })

  return (
    <Form
      className="w-72"
      defaults={{ username: '' }}
      schema={schema}
      rootError={rootError}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <TextField
            control={form.control}
            inputName="username"
            label="Username"
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

  // Test client side validation
  await screen.getByLabelText('Username').fill('Jim')
  await screen.getByText('Submit').click()
  expect(
    screen.getByText(
      'Your username must be at least 4 characters. The chosen name is 3 characters long.'
    )
  ).toBeInTheDocument()

  // Submit the form
  await screen.getByLabelText('Username').fill('John')
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
})

test('Form component with inline root errors', async ({ worker }) => {
  // Add rest handler
  worker.use(inertiaResponseError)

  // Wrap with Toaster component
  const screen = await render(<FormAndSchema rootError="monitor" />, {
    wrapper: WithToaster
  })

  // Submit the form
  await screen.getByLabelText('Username').fill('John')
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
})
