import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { CalendarField, Form, InputRule, Schema, Submit } from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

const onSuccess = vi.fn()

function FormAndSchema({
  defaultValue = '',
  disabled,
  formatter
}: {
  defaultValue?: string
  disabled?: boolean
  formatter?: (date: Date) => string
}) {
  const schema = new Schema({ calendar: new InputRule() })

  return (
    <Form
      className="w-72"
      defaults={{ calendar: defaultValue }}
      onSuccess={onSuccess}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <CalendarField
            control={form.control}
            dateToString={formatter}
            disabled={disabled}
            inputName="calendar"
            label="Calendar"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('CalendarField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  const button = screen.getByLabelText('1').first()
  await button.click()
  await button.click()
  await screen.getByLabelText('2').first().click()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})

test('CalendarField component 2', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  const button = screen.getByLabelText('1').first()
  await button.click()
  await button.click()
  await screen.getByLabelText('2').first().click()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})

test('CalendarField component disabled', async () => {
  const screen = await render(<FormAndSchema disabled />, {
    wrapper: WithToaster
  })

  expect(screen.getByLabelText('1').first()).toBeDisabled()
})
