import { Form, InputTextRule, Schema, Submit, TextField } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    name: new InputTextRule({ maxChars: 20, minChars: 4 })
  })

  return (
    <Form
      className="w-72"
      onSuccess={onSuccess}
      schema={schema}
      route={formRoute}
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

test('TextField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Name').fill('John')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
