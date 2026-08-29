import { expect, vi } from 'vite-plus/test'
import { Form, InputTextRule, Schema, Submit, TextField } from '@/index'
import { formRoute, inertiaResponseSuccess, render, test } from './utility'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    name: new InputTextRule({ maxChars: 20, minChars: 4 })
  })

  return (
    <Form
      className="w-72"
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
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
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Name').fill('John')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
