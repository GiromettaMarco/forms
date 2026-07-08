import { Form, InfoCheckboxField, Submit } from '@/index'
import { InputCheckboxRule, Schema } from '@gmcode/tsv-input'
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
      defaults={{ infoCheckbox: '' }}
      schema={new Schema({ infoCheckbox: new InputCheckboxRule() })}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <InfoCheckboxField
            control={form.control}
            inputName="infoCheckbox"
            {...props}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  tags: ['autodocs'],
  title: 'Components/InfoCheckboxField'
} satisfies Meta<Props>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Info Checkbox',
    onCheckedChange: fn()
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByLabelText('Info Checkbox'))
    await waitFor(() => expect(args.onCheckedChange).toHaveBeenCalled())
  }
}
