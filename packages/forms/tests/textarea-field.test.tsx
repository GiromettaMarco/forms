import { Form, InputTextRule, Schema, Submit, TextareaField } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

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
      schema={schema}
      route={formRoute}
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
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Textarea').fill('Lorem Ipsum')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
