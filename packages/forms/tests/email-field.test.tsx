import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { EmailField, Form, InputEmailRule, Schema, Submit } from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    email: new InputEmailRule()
  })

  return (
    <Form
      className="w-72"
      defaults={{ email: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <EmailField
            control={form.control}
            inputName="email"
            label="Email"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('EmailField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Email').fill('test@example.com')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
