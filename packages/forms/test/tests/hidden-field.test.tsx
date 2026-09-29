import { InputRule, Schema } from '@gmcode/tsv-input'
import { test } from '@repo/msw-fixture'
import { expect, vi } from 'vite-plus/test'
import { Form } from '@/components/form'
import { HiddenField } from '@/components/hidden-field'
import { Submit } from '@/components/submit'
import { render } from '../fixtures/render'
import { inertiaResponseSuccess } from '../mocks/handlers'
import { formRoute } from '../mocks/routes'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    hidden: new InputRule()
  })

  return (
    <Form
      className="w-72"
      defaults={{ hidden: 'token' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <HiddenField
            control={form.control}
            inputName="hidden"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('HiddenField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />)

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
