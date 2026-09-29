import { InputSelectRule, Schema } from '@gmcode/tsv-input'
import { test } from '@repo/msw-fixture'
import { expect, vi } from 'vite-plus/test'
import { Form } from '@/components/form'
import { NullableSelectField } from '@/components/nullable-select-field'
import { Submit } from '@/components/submit'
import { render } from '../fixtures/render'
import { inertiaResponseSuccess } from '../mocks/handlers'
import { formRoute } from '../mocks/routes'

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
