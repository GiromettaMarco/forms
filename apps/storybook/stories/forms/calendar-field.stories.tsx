import { InputRule, Schema } from '@gmcode/forms'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { CalendarField } from '@/forms/calendar-field'
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
    inputName: 'calendar',
    label: 'Calendar'
  },
  argTypes: {
    control: { control: false },
    inputId: { control: 'text' },
    inputName: { control: false },
    label: { control: 'text' },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'responsive']
    },
    stringToDate: { control: false }
  },
  component: CalendarField,
  parameters: {
    docs: {
      source: {
        code: `<CalendarField
            control={form.control}
            inputName='calendar'
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
  }: ComponentProps<typeof CalendarField>) => (
    <Form
      defaults={{ calendar: '' }}
      onSuccess={flashSuccessMessage}
      route={formRoute}
      schema={new Schema({ calendar: new InputRule() })}
      setDefaultsOnSuccess
    >
      {({ form, loading }) => (
        <>
          <CalendarField
            {...props}
            control={form.control}
            inputName="calendar"
          />
          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  title: 'Forms/CalendarField'
} satisfies Meta<typeof CalendarField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
