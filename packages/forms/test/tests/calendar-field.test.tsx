import { InputRule, Schema } from '@gmcode/tsv-input'
import { test } from '@repo/msw-fixture'
import { expect, vi } from 'vite-plus/test'
import { CalendarField } from '@/components/calendar-field'
import { Form } from '@/components/form'
import { Submit } from '@/components/submit'
import { render } from '../fixtures/render'
import { inertiaResponseSuccess } from '../mocks/handlers'
import { formRoute } from '../mocks/routes'

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
  const screen = await render(<FormAndSchema />)

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
  const screen = await render(<FormAndSchema disabled />)

  expect(screen.getByLabelText('1').first()).toBeDisabled()
})
