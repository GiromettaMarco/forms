import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Form, InputSelectRule, Schema, SelectField, Submit } from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

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
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Select').click()
  const option1 = screen.getByText('Option 1').last()
  await option1.click()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
