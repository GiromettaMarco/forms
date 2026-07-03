import { Form, NumericField, Submit } from '@/index'
import { InputNumberRule, Schema } from '@gmcode/tsv-input'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { formRoute, handler200 } from '../msw'

interface Props {
  disabled?: boolean
  inputId?: string
  inputMode?: 'decimal' | 'numeric'
  label?: string
  placeholder?: string
  ui?: boolean
  ui_labelMinus?: string
  ui_labelPlus?: string
  ui_max?: number
  ui_min?: number
  ui_step?: number
}

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
    inputId: { control: 'text' },
    inputMode: { control: 'radio', options: ['decimal', 'numeric'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    ui: { control: 'boolean' },
    ui_labelMinus: { control: 'text' },
    ui_labelPlus: { control: 'text' },
    ui_max: { control: 'number' },
    ui_min: { control: 'number' },
    ui_step: { control: 'number' }
  },
  parameters: {
    layout: 'centered',
    msw: { handlers: [handler200] }
  },
  render: ({
    ui,
    ui_labelMinus,
    ui_labelPlus,
    ui_max,
    ui_min,
    ui_step,
    ...props
  }) => (
    <Form
      defaults={{ number: '' }}
      schema={
        new Schema({
          number: new InputNumberRule({
            integer: false,
            maxValue: ui_max,
            minValue: ui_min
          })
        })
      }
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <NumericField
            control={form.control}
            inputName="number"
            ui={
              ui
                ? {
                    labelMinus: ui_labelMinus,
                    labelPlus: ui_labelPlus,
                    max: ui_max,
                    min: ui_min,
                    setValue: form.setValue,
                    step: ui_step
                  }
                : undefined
            }
            {...props}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  ),
  tags: ['autodocs'],
  title: 'Components/NumericField'
} satisfies Meta<Props>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const UI: Story = {
  args: {
    label: 'UI',
    ui: true,
    ui_labelMinus: 'Minus 1',
    ui_labelPlus: 'Plus 1',
    ui_max: 5,
    ui_min: 0,
    ui_step: 1
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('UI')
    const minus = canvas.getByLabelText('Minus 1')
    const plus = canvas.getByLabelText('Plus 1')

    await userEvent.type(input, '4')
    await userEvent.click(plus)
    await userEvent.click(plus)
    await expect(input).toHaveValue('5')

    await userEvent.clear(input)
    await userEvent.type(input, '1')
    await userEvent.click(minus)
    await userEvent.click(minus)
    await expect(input).toHaveValue('0')

    await userEvent.clear(input)
    await userEvent.type(input, '10')
    await userEvent.click(canvas.getByText('Submit'))
    await waitFor(() =>
      expect(canvas.getByText('maxValue')).toBeInTheDocument()
    )

    await userEvent.clear(input)
    await userEvent.type(input, 'a')
    await userEvent.click(plus)
    await expect(input).toHaveValue('')
    await expect(canvas.getByText('required')).toBeInTheDocument()
  }
}
