import { InputCheckboxRule, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  flashSuccessMessage,
  formRoute,
  inertiaResponseSuccess
} from '../utility'
import { CheckboxField } from '@/forms/checkbox-field'
import type { ComponentProps } from 'react'
import { Form } from '@/forms/form'
import { Submit } from '@/forms/submit'

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
    inputName: 'checkbox',
    label: 'Checkbox'
  },
  component: CheckboxField,
  parameters: {
    docs: {
      source: {
        code: `<CheckboxField
            control={form.control}
            inputName='checkbox'
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
  }: ComponentProps<typeof CheckboxField>) => (
    <Form
      defaults={{ checkbox: '' }}
      onSuccess={flashSuccessMessage}
      schema={new Schema({ checkbox: new InputCheckboxRule() })}
      setDefaultsOnSuccess
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <CheckboxField
            control={form.control}
            {...props}
          />
          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  title: 'Forms/CheckboxField'
} satisfies Meta<typeof CheckboxField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
