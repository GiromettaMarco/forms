import { FancyRadioField, Form, InputSelectRule, Schema, Submit } from '@/index'
import { Monitor, Moon, Sun } from 'lucide-react'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema({
    appearance: new InputSelectRule({ options: ['dark', 'light', 'system'] })
  })

  return (
    <Form
      className="w-72"
      defaults={{ appearance: 'system' }}
      onSuccess={onSuccess}
      schema={schema}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <FancyRadioField
            control={form.control}
            defaultValue="light"
            inputName="appearance"
            label="Appearance"
            options={[
              {
                Icon: Sun,
                label: 'Light',
                value: 'light'
              },
              {
                Icon: Moon,
                label: 'Dark',
                value: 'dark'
              },
              {
                Icon: Monitor,
                label: 'System',
                value: 'system'
              }
            ]}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('FancyRadioField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByText('Dark').click()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
