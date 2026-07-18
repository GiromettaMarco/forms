import { Form, HiddenField, InputRule, Schema, Submit } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

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
      schema={schema}
      route={formRoute}
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
