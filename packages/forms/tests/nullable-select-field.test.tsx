import { expect, vi } from 'vite-plus/test'
import {
  Form,
  InputSelectRule,
  NullableSelectField,
  Schema,
  Submit
} from '@/index'
import { formRoute, inertiaResponseSuccess, render, test } from './utility'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    nullableSelect: new InputSelectRule({
      optional: true,
      options: ['option1', 'option2']
    })
  })

  return (
    <Form
      className="w-72"
      defaults={{ nullableSelect: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <NullableSelectField
            control={form.control}
            inputName="nullableSelect"
            label="Select"
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' }
            ]}
            setValue={form.setValue}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('NullableSelectField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Select').click()
  const option1 = screen.getByText('Option 1').last()
  await option1.click()
  await screen.getByLabelText('Reset').click()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
