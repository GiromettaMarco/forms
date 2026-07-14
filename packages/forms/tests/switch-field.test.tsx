import { Form, InputCheckboxRule, Schema, Submit, SwitchField } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onCheckedChange = vi.fn()

function FormAndSchema() {
  const schema = new Schema({ switch: new InputCheckboxRule() })

  return (
    <Form
      className="w-72"
      defaults={{ switch: '' }}
      schema={schema}
      route={formRoute}
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

test('SwitchField component', async () => {
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Switch').click()
  expect(onCheckedChange).toHaveBeenCalled()
})
