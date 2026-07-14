import { Form, InputNumberRule, NumericField, Schema, Submit } from '@/index'
import { formRoute, test } from './utility'
import { WithToaster } from './with-toaster'
import { expect } from 'vite-plus/test'
import { render } from 'vitest-browser-react'

function FormAndSchema({
  ui_max,
  ui_min,
  ui_step
}: {
  ui_max?: number
  ui_min?: number
  ui_step?: number
}) {
  const schema = new Schema({
    number: new InputNumberRule({
      integer: false,
      maxValue: ui_max,
      minValue: ui_min
    })
  })

  return (
    <Form
      className="w-72"
      defaults={{ number: '' }}
      schema={schema}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <NumericField
            control={form.control}
            inputName="number"
            label="Numeric field with UI"
            ui={{
              max: ui_max,
              min: ui_min,
              setValue: form.setValue,
              step: ui_step
            }}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('NumericField component with UI', async () => {
  const screen = await render(
    <FormAndSchema
      ui_max={5}
      ui_min={0}
      ui_step={1}
    />,
    { wrapper: WithToaster }
  )

  const input = screen.getByLabelText('Numeric field with UI')
  const minus = screen.getByLabelText('Decrease')
  const plus = screen.getByLabelText('Increase')

  await input.fill('4')
  await plus.click(plus)
  await plus.click(plus)
  expect(input).toHaveValue('5')

  await input.fill('1')
  await minus.click(minus)
  await minus.click(minus)
  expect(input).toHaveValue('0')

  await input.fill('10')
  await screen.getByText('Submit').click()
  expect(
    screen.getByText('The field must not be greater than 5.')
  ).toBeInTheDocument()

  await input.fill('a')
  await plus.click(plus)
  expect(input).toHaveValue('')
  expect(screen.getByText('The field is required.')).toBeInTheDocument()
})
