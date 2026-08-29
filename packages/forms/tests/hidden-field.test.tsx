import { expect, vi } from 'vite-plus/test'
import { Form, HiddenField, InputRule, Schema, Submit } from '@/index'
import { formRoute, inertiaResponseSuccess, render, test } from './utility'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    hidden: new InputRule()
  })

  return (
    <Form
      className="w-72"
      defaults={{ hidden: 'token' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <HiddenField
            control={form.control}
            inputName="hidden"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('HiddenField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
