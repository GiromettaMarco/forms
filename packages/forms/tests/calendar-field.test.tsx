import { CalendarField, Form, InputRule, Schema, Submit } from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

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
