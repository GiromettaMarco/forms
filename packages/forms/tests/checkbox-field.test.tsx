import { CheckboxField, Form, InputCheckboxRule, Schema, Submit } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onCheckedChange = vi.fn()

function FormAndSchema() {
  const schema = new Schema({ checkbox: new InputCheckboxRule() })

  return (
    <Form
      className="w-72"
      defaults={{ checkbox: '' }}
      schema={schema}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <CheckboxField
            control={form.control}
            inputName="checkbox"
            label="Checkbox"
            onCheckedChange={onCheckedChange}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('CheckboxField component', async () => {
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Checkbox').click()
  expect(onCheckedChange).toHaveBeenCalled()
})
