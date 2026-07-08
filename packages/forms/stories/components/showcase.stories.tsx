import {
  CalendarField,
  CheckboxField,
  EmailField,
  FancyRadioField,
  Form,
  HiddenField,
  InfoCheckboxField,
  NullableSelectField,
  NumericField,
  PasswordField,
  SelectField,
  Submit,
  SwitchField,
  TextField,
  TextareaField
} from '@/index'
import {
  InputCheckboxRule,
  InputEmailRule,
  InputNumberRule,
  InputRule,
  InputSelectRule,
  InputTextRule,
  Message,
  Schema
} from '@/validation'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Monitor, Moon, Sun } from 'lucide-react'
import { expect, fn, waitFor } from 'storybook/test'
import { formRoute, inertiaResponseSuccess } from '../msw'

const schema = new Schema(
  {
    appearance: new InputSelectRule({ options: ['dark', 'light', 'system'] }),
    bio: new InputTextRule({ maxChars: 255, optional: true }),
    birth: new InputRule({ optional: true }),
    email: new InputEmailRule(),
    name: new InputTextRule({ maxChars: 20, minChars: 4 }),
    newsletter: new InputRule({ optional: true }),
    number: new InputNumberRule({ maxValue: 10, minValue: 0, optional: true }),
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

const meta = {
  args: {
    children: () => null,
    className: 'md:w-160',
    onStart: fn(),
    onSuccess: fn(),
    route: formRoute,
    schema: new Schema({})
  },
  component: Form,
  parameters: { layout: 'centered' },
  render: ({ schema: _schema, ...props }) => (
    <Form
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
      schema={schema}
      {...props}
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
  ),
  tags: ['autodocs'],
  title: 'Components/Showcase'
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: { handlers: [inertiaResponseSuccess] }
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Name'), 'John')
    await userEvent.type(
      canvas.getByLabelText('Email address'),
      'test@example.com'
    )
    await userEvent.type(canvas.getByLabelText('Password'), 'admin1234')
    await userEvent.type(canvas.getByLabelText('Confirm Password'), 'admin1234')

    // @NOTE Currently broken in storybook
    // import { screen, waitForElementToBeRemoved } from 'storybook/test'
    // await userEvent.click(canvas.getByLabelText('Role'))
    // const option1 = screen.getAllByText('Editor')[1]
    // await userEvent.click(option1)
    // await waitForElementToBeRemoved(option1)

    await userEvent.click(canvas.getByLabelText('Reset'))
    await userEvent.type(canvas.getByLabelText('Number'), '5')
    await userEvent.click(canvas.getByLabelText('Remember me'))
    await userEvent.click(canvas.getByLabelText('ON/OFF'))
    await userEvent.click(canvas.getByText('Dark'))
    await userEvent.type(canvas.getByLabelText('Biography'), 'Lorem Ipsum')
    await userEvent.click(canvas.getByText('Terms & Policy'))
    await userEvent.click(canvas.getByText('Newsletter'))
    await userEvent.click(canvas.getByText('Submit'))
    await waitFor(() => expect(args.onSuccess).toHaveBeenCalled())
  }
}
