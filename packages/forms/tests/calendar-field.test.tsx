import { CalendarField, Form, InputRule, Schema, Submit } from '@/index'
import { formRoute, test } from './utility'
import { WithToaster } from './with-toaster'
import { expect } from 'vite-plus/test'
import { render } from 'vitest-browser-react'

function FormAndSchema({
  disabled,
  formatter
}: {
  disabled?: boolean
  formatter?: (date: Date) => string
}) {
  const schema = new Schema({ calendar: new InputRule() })

  return (
    <Form
      className="w-72"
      defaults={{ calendar: '' }}
      schema={schema}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <CalendarField
            control={form.control}
            disabled={disabled}
            dateToString={formatter}
            inputName="calendar"
            label="Calendar"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('CalendarField component', async () => {
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  const button = screen.getByLabelText('1').first()
  await button.click()
  await button.click()
})

test('CalendarField component disabled', async () => {
  const screen = await render(<FormAndSchema disabled />, {
    wrapper: WithToaster
  })

  expect(screen.getByLabelText('1').first()).toBeDisabled()
})
