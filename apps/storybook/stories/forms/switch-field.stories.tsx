import { InputCheckboxRule, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  flashSuccessMessage,
  formRoute,
  inertiaResponseSuccess
} from '../utility'
import type { ComponentProps } from 'react'
import { Form } from '@/forms/form'
import { Submit } from '@/forms/submit'
import { SwitchField } from '@/forms/switch-field'

const meta = {
  argTypes: {
    control: { control: false },
    disabled: { control: 'boolean' },
    inputId: { control: 'text' },
    inputName: { control: false },
    label: { control: 'text' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive']
    },
    readOnly: { control: 'boolean' },
    uncheckedValue: { control: 'text' },
    value: { control: 'text' }
  },
  args: {
    control: undefined,
    inputName: 'switch',
    label: 'Switch'
  },
  component: SwitchField,
  parameters: {
    docs: {
      source: {
        code: `<SwitchField
            control={form.control}
            inputName='switch'
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
  }: ComponentProps<typeof SwitchField>) => (
    <Form
      defaults={{ switch: '' }}
      onSuccess={flashSuccessMessage}
      schema={new Schema({ switch: new InputCheckboxRule() })}
      setDefaultsOnSuccess
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <SwitchField
            {...props}
            control={form.control}
            inputName="switch"
            onCheckedChange={undefined}
          />
          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  title: 'Forms/SwitchField'
} satisfies Meta<typeof SwitchField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
