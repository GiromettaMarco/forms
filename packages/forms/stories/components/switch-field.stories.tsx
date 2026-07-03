import { Form, Submit, SwitchField } from '@/index'
import { InputRule, Schema } from '@gmcode/tsv-input'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, waitFor } from 'storybook/test'
import { formRoute, handler200 } from '../msw'

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
    msw: { handlers: [handler200] }
  },
  render: ({ ...props }) => (
    <Form
      defaults={{ switch: '' }}
      schema={
        new Schema({
          // @TODO switch: new InputCheckboxRule()
          switch: new InputRule({ optional: true })
        })
      }
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
