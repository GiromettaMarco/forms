import { Form, InputCheckboxRule, Schema, Submit, SwitchField } from '@/index'
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
      defaults={{ switch: '' }}
      schema={new Schema({ switch: new InputCheckboxRule() })}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <SwitchField
            control={form.control}
            inputName="switch"
            {...props}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  tags: ['autodocs'],
  title: 'Components/SwitchField'
} satisfies Meta<Props>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Switch',
    onCheckedChange: fn()
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Switch'))
    await waitFor(() => expect(args.onCheckedChange).toHaveBeenCalled())
  }
}
