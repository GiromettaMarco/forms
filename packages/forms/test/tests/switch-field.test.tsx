import { InputCheckboxRule, Schema } from '@gmcode/tsv-input'
import { expect, vi } from 'vite-plus/test'
import { Form } from '@/components/form'
import { Submit } from '@/components/submit'
import { SwitchField } from '@/components/switch-field'
import { formRoute, inertiaResponseSuccess } from '../fixtures/msw'
import { render } from '../fixtures/render'
import { test } from '../fixtures/test'

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
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Switch').click()
  expect(onCheckedChange).toHaveBeenCalledOnce()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
