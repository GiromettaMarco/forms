import { InputNumberRule, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  flashSuccessMessage,
  formRoute,
  inertiaResponseSuccess
} from '../utility'
import type { ComponentProps } from 'react'
import { Form } from '@/forms/form'
import { NumericField } from '@/forms/numeric-field'
import { Submit } from '@/forms/submit'

const meta = {
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
  args: {
    control: undefined,
    inputName: 'number',
    label: 'Numeric',
    ui: {
      max: 5,
      min: 0,
      setValue: () => {},
      step: 1
    }
  },
  component: NumericField,
  parameters: {
    docs: {
      source: {
        code: `<NumericField
            control={form.control}
            inputName='number'
            ui={
              max: 5,
              min: 0,
              setValue: form.setValue,
              step: 1,
            }
            // ...
          />`
      }
    },
    layout: 'centered',
    msw: { handlers: [inertiaResponseSuccess] }
  },
  render: ({
    control: _control,
    ui,
    ...props
  }: ComponentProps<typeof NumericField>) => (
    <Form
      className="w-72"
      defaults={{ number: '' }}
      onSuccess={flashSuccessMessage}
      schema={
        new Schema({
          number: new InputNumberRule({
            integer: false,
            maxValue: ui?.max,
            minValue: ui?.min
          })
        })
      }
      setDefaultsOnSuccess
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <NumericField
            {...props}
            control={form.control}
            inputName="number"
            ui={
              ui
                ? {
                    ...ui,
                    setValue: form.setValue
                  }
                : undefined
            }
          />
          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  title: 'Forms/NumericField'
} satisfies Meta<typeof NumericField>

export default meta

type Story = StoryObj<typeof meta>

export const WithUI: Story = {}

export const WithoutUI: Story = {
  args: {
    ui: undefined
  }
}
