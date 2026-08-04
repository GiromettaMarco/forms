import { InputPasswordRule, PasswordField, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Form } from '@/forms/form'
import { Submit } from '@/forms/submit'
import {
  flashSuccessMessage,
  formRoute,
  inertiaResponseSuccess
} from '../utility'

const meta = {
  args: {
    control: undefined,
    inputName: 'password',
    label: 'Password'
  },
  argTypes: {
    autoComplete: { control: 'text' },
    control: { control: false },
    disabled: { control: 'boolean' },
    inputId: { control: 'text' },
    inputName: { control: false },
    label: { control: 'text' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive']
    },
    placeholder: { control: 'text' },
    type: { control: 'text' }
  },
  component: PasswordField,
  parameters: {
    docs: {
      source: {
        code: `<PasswordField
            control={form.control}
            inputName='password'
            // ...
          />`
      }
    },
    layout: 'centered',
    msw: { handlers: [inertiaResponseSuccess] }
  },
  render: ({
    control: _control,
    ...props
  }: ComponentProps<typeof PasswordField>) => (
    <Form
      className="w-72"
      defaults={{ password: '' }}
      onSuccess={flashSuccessMessage}
      route={formRoute}
      schema={new Schema({ password: new InputPasswordRule() })}
      setDefaultsOnSuccess
    >
      {({ form, loading }) => (
        <>
          <PasswordField
            {...props}
            control={form.control}
            inputName="password"
          />
          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  title: 'Forms/PasswordField'
} satisfies Meta<typeof PasswordField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
