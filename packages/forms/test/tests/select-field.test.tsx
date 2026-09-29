import { InputSelectRule, Schema } from '@gmcode/tsv-input'
import { test } from '@repo/msw-fixture'
import { expect, vi } from 'vite-plus/test'
import { Form } from '@/components/form'
import { SelectField } from '@/components/select-field'
import { Submit } from '@/components/submit'
import { render } from '../fixtures/render'
import { inertiaResponseSuccess } from '../mocks/handlers'
import { formRoute } from '../mocks/routes'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    select: new InputSelectRule({
      options: ['option1', 'option2']
    })
  })

  return (
    <Form
      className="w-72"
      defaults={{ select: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <SelectField
            control={form.control}
            inputName="select"
            label="Select"
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' }
            ]}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('SelectField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Select').click()
  const option1 = screen.getByText('Option 1').last()
  await option1.click()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
