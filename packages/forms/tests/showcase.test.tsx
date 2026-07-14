import {
  CalendarField,
  CheckboxField,
  EmailField,
  FancyRadioField,
  Form,
  HiddenField,
  InfoCheckboxField,
  InputCheckboxRule,
  InputEmailRule,
  InputNumberRule,
  InputRule,
  InputSelectRule,
  InputTextRule,
  Message,
  NullableSelectField,
  NumericField,
  PasswordField,
  Schema,
  SelectField,
  Submit,
  SwitchField,
  TextField,
  TextareaField
} from '@/index'
import { Monitor, Moon, Sun } from 'lucide-react'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onSuccess = vi.fn()

function FormAndSchema() {
  const schema = new Schema(
    {
      appearance: new InputSelectRule({ options: ['dark', 'light', 'system'] }),
      bio: new InputTextRule({ maxChars: 255, optional: true }),
      birth: new InputRule({ optional: true }),
      email: new InputEmailRule(),
      name: new InputTextRule({ maxChars: 20, minChars: 4 }),
      newsletter: new InputRule({ optional: true }),
      number: new InputNumberRule({
        maxValue: 10,
        minValue: 0,
        optional: true
      }),
      password: new InputTextRule({ minChars: 8 }),
      password_confirm: new InputTextRule({ minChars: 8 }),
      policy: new InputRule(),
      remember: new InputCheckboxRule(),
      role: new InputSelectRule({
        optional: true,
        options: ['editor', 'reader']
      }),
      switch: new InputCheckboxRule(),
      title: new InputSelectRule({ optional: true, options: ['mr', 'mrs'] }),
      token: new InputRule()
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
      className="w-full md:w-160"
      defaults={{
        appearance: 'light',
        bio: '',
        birth: '',
        email: '',
        name: '',
        newsletter: '',
        number: '',
        password: '',
        password_confirm: '',
        policy: '',
        remember: '',
        role: '',
        title: 'mrs',
        token: 'hidden-token'
      }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-3">
              <TextField
                control={form.control}
                inputName="name"
                label="Name"
                placeholder="Full name"
              />

              <EmailField
                control={form.control}
                inputName="email"
                label="Email address"
                placeholder={'email@example.com'}
              />

              <PasswordField
                control={form.control}
                inputName="password"
                label="Password"
                placeholder="Password"
              />

              <PasswordField
                control={form.control}
                inputName="password_confirm"
                label="Confirm Password"
                placeholder="Password"
              />
            </div>

            <div className="flex flex-col gap-3">
              <SelectField
                control={form.control}
                inputName="role"
                label="Role"
                options={[
                  { label: 'Editor', value: 'editor' },
                  { label: 'Reader', value: 'reader' }
                ]}
                placeholder="Select your role"
              />

              <NullableSelectField
                control={form.control}
                inputName="title"
                label="Title"
                options={[
                  { label: 'Mr.', value: 'mr' },
                  { label: 'Mrs.', value: 'mrs' }
                ]}
                placeholder="How others should call you"
                setValue={form.setValue}
              />

              <NumericField
                control={form.control}
                inputName="number"
                label="Number"
                placeholder="Choose a number between 0 and 10"
                ui={{
                  max: 10,
                  min: 0,
                  setValue: form.setValue
                }}
              />

              <div className="mt-4 flex flex-row gap-3 md:mt-8">
                <CheckboxField
                  control={form.control}
                  inputName="remember"
                  label="Remember me"
                />

                <SwitchField
                  control={form.control}
                  inputName="switch"
                  label="ON/OFF"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col gap-3">
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

              <TextareaField
                control={form.control}
                inputName="bio"
                label="Biography"
                placeholder="Write something about yourself"
                maxRows={7}
                minRows={3}
              />
            </div>

            <CalendarField
              control={form.control}
              inputName="birth"
              label="Birth Date"
            />
          </div>

          <InfoCheckboxField
            control={form.control}
            inputName="policy"
            label="Terms & Policy"
          >
            <p className="text-sm text-muted-foreground">
              I have read and agree to the{' '}
              <a
                className="underline hover:text-accent-foreground"
                href="#"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                className="underline hover:text-accent-foreground"
                href="#"
              >
                Privacy Policy
              </a>
            </p>
          </InfoCheckboxField>

          <InfoCheckboxField
            control={form.control}
            inputName="newsletter"
            label="Newsletter"
            text="Yes, I would like to receive commercial emails and offers from ..."
          />

          <HiddenField
            control={form.control}
            inputName="token"
          />

          <Submit
            className="w-full"
            loading={loading}
          />
        </>
      )}
    </Form>
  )
}

test('Showcase of components and rules', async ({ worker }) => {
  // Add rest handler
  worker.use(inertiaResponseSuccess)

  // Render the page
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  // fill the form
  await screen.getByLabelText('Name').fill('John')
  await screen.getByLabelText('Email address').fill('test@example.com')
  await screen.getByLabelText('Password', { exact: true }).fill('admin1234')
  await screen.getByLabelText('Confirm Password').fill('admin1234')
  await screen.getByLabelText('Role').click()
  const option1 = screen.getByText('Editor').last()
  await option1.click()
  await screen.getByLabelText('Reset').click()
  await screen.getByLabelText('Number').fill('5')
  await screen.getByLabelText('Remember me').click()
  await screen.getByLabelText('ON/OFF').click()
  await screen.getByText('Dark').click()
  await screen.getByLabelText('Biography').fill('Lorem Ipsum')
  await screen.getByLabelText('Terms & Policy').click()
  await screen.getByLabelText('Newsletter').click()
  await screen.getByText('Submit').click()

  expect(onSuccess).toHaveBeenCalled()
})
