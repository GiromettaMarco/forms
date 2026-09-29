import { InputCheckboxRule, Schema } from '@gmcode/inertia-hook-form/tsv'
import { test } from '@repo/msw-fixture'
import { expect, vi } from 'vite-plus/test'
import { CheckboxField } from '@/components/checkbox-field'
import { Form } from '@/components/form'
import { Submit } from '@/components/submit'
import { render } from '../fixtures/render'
import { inertiaResponseSuccess } from '../mocks/handlers'
import { formRoute } from '../mocks/routes'

const onCheckedChange = vi.fn()
const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({ checkbox: new InputCheckboxRule() })

  return (
    <Form
      className="w-72"
      defaults={{ checkbox: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
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

test('CheckboxField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Checkbox').click()
  expect(onCheckedChange).toHaveBeenCalledOnce()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
