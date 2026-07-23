import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Form, InputCheckboxRule, Schema, Submit, SwitchField } from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

const onCheckedChange = vi.fn()
const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({ switch: new InputCheckboxRule() })

  return (
    <Form
      className="w-72"
      defaults={{ switch: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <SwitchField
            control={form.control}
            inputName="switch"
            label="Switch"
            onCheckedChange={onCheckedChange}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('SwitchField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Switch').click()
  expect(onCheckedChange).toHaveBeenCalledOnce()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
