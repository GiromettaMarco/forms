import { CheckboxField, Form, InputCheckboxRule, Schema, Submit } from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, waitFor } from 'storybook/test'
import { formRoute, inertiaResponseSuccess } from '../msw'

interface Props {
  disabled?: boolean
  inputId?: string
  label?: string
  onCheckedChange?: () => void
  readOnly?: boolean
}

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
    inputId: { control: 'text' },
    label: { control: 'text' },
    readOnly: { control: 'boolean' }
  },
  parameters: {
    layout: 'centered',
    msw: { handlers: [inertiaResponseSuccess] }
  },
  render: ({ ...props }) => (
    <Form
      defaults={{ checkbox: '' }}
      schema={new Schema({ checkbox: new InputCheckboxRule() })}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <CheckboxField
            control={form.control}
            inputName="checkbox"
            {...props}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  tags: ['autodocs'],
  title: 'Components/CheckboxField'
} satisfies Meta<Props>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Checkbox',
    onCheckedChange: fn()
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Checkbox'))
    await waitFor(() => expect(args.onCheckedChange).toHaveBeenCalled())
  }
}
