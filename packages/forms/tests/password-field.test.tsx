import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import {
  Form,
  InputTextRule,
  Message,
  PasswordField,
  Schema,
  Submit
} from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema(
    {
      password: new InputTextRule({ minChars: 8 }),
      password_confirm: new InputTextRule({ minChars: 8 })
    },
    {
      postValidation: [
        {
          addTo: 'password_confirm',
          callback: ({
            password,
            password_confirm
          }: {
            password: string
            password_confirm: string
          }) => {
            if (password === password_confirm) {
              return true
            } else {
              return new Message('password_confirm.match')
            }
          }
        }
      ]
    }
  )

  return (
    <Form
      className="w-72"
      defaults={{ password: '', password_confirm: '' }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <PasswordField
            control={form.control}
            inputName="password"
            label="Password"
          />

          <PasswordField
            control={form.control}
            inputName="password_confirm"
            label="Confirm Password"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('PasswordField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Password', { exact: true }).fill('admin1234')
  await screen.getByLabelText('Confirm Password').fill('admin1234')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
