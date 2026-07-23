import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Form, HiddenField, InputRule, Schema, Submit } from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

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
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
