import { InputCheckboxRule, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Form } from '@/forms/form'
import { InfoCheckboxField } from '@/forms/info-checkbox-field'
import { Submit } from '@/forms/submit'
import {
  flashSuccessMessage,
  formRoute,
  inertiaResponseSuccess
} from '../utility'

const meta = {
  args: {
    control: undefined,
    inputName: 'infoCheckbox',
    label: 'Info Checkbox',
    text: 'Yes, I would like to receive commercial emails and offers from ...'
  },
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
    text: { control: 'text' },
    uncheckedValue: { control: 'text' },
    value: { control: 'text' }
  },
  component: InfoCheckboxField,
  parameters: {
    docs: {
      source: {
        code: `<InfoCheckboxField
            control={form.control}
            inputName='infoCheckbox'
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
  }: ComponentProps<typeof InfoCheckboxField>) => (
    <Form
      className="max-w-96"
      defaults={{ infoCheckbox: '' }}
      onSuccess={flashSuccessMessage}
      route={formRoute}
      schema={new Schema({ infoCheckbox: new InputCheckboxRule() })}
      setDefaultsOnSuccess
    >
      {({ form, loading }) => (
        <>
          <InfoCheckboxField
            {...props}
            control={form.control}
            inputName="infoCheckbox"
            onCheckedChange={undefined}
          />
          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  title: 'Forms/InfoCheckboxField'
} satisfies Meta<typeof InfoCheckboxField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
