import { CalendarField, Form, Submit } from '@/index'
import { InputRule, Schema } from '@gmcode/tsv-input'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, waitFor } from 'storybook/test'
import { formRoute, inertiaResponseSuccess } from '../msw'

interface Props {
  disabled?: boolean
  formatter?: (date: Date) => string
  inputId?: string
  label?: string
}

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
    inputId: { control: 'text' },
    label: { control: 'text' }
  },
  parameters: {
    layout: 'centered',
    msw: { handlers: [inertiaResponseSuccess] }
  },
  render: ({ ...props }) => (
    <Form
      defaults={{ calendar: '' }}
      schema={new Schema({ calendar: new InputRule() })}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <CalendarField
            control={form.control}
            inputName="calendar"
            {...props}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  tags: ['autodocs'],
  title: 'Components/CalendarField'
} satisfies Meta<Props>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    formatter: fn()
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getAllByText('1')[0])
    await waitFor(() => expect(args.formatter).toHaveBeenCalled())
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    formatter: fn()
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText('1')[0]).toBeDisabled()
  }
}
