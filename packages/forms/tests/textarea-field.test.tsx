import { expect, vi } from 'vite-plus/test'
import { Form, InputTextRule, Schema, Submit, TextareaField } from '@/index'
import { formRoute, inertiaResponseSuccess, render, test } from './utility'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    textarea: new InputTextRule({ maxChars: 255, optional: true })
  })

  return (
    <Form
      className="w-72"
      defaults={{ textarea: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <TextareaField
            control={form.control}
            inputName="textarea"
            label="Textarea"
            maxRows={7}
            minRows={3}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('TextareaField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Textarea').fill('Lorem Ipsum')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
