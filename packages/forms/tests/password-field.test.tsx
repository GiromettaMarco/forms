import { InputPasswordRule } from '@gmcode/tsv-input'
import { expect, vi } from 'vite-plus/test'
import {
  Form,
  InputTextRule,
  Message,
  PasswordField,
  Schema,
  Submit
} from '@/index'
import { formRoute, inertiaResponseSuccess, render, test } from './utility'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema(
    {
      password: new InputPasswordRule(),
      password_confirm: new InputTextRule()
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
  const screen = await render(<FormAndSchema />)

  await screen.getByLabelText('Password', { exact: true }).fill('Admin_123456')
  await screen.getByLabelText('Confirm Password').fill('Admin_123456')

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
