import { InputEmailRule, Schema } from '@gmcode/tsv-input'
import { test } from '@repo/msw-fixture'
import { expect, vi } from 'vite-plus/test'
import { EmailField } from '@/components/email-field'
import { Form } from '@/components/form'
import { Submit } from '@/components/submit'
import { render } from '../fixtures/render'
import { inertiaResponseSuccess } from '../mocks/handlers'
import { formRoute } from '../mocks/routes'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    email: new InputEmailRule()
  })

  return (
    <Form
      className="w-72"
      defaults={{ email: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <EmailField
            control={form.control}
            inputName="email"
            label="Email"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('EmailField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Email').fill('test@example.com')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
