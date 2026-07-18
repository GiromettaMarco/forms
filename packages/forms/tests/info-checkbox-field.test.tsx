import {
  Form,
  InfoCheckboxField,
  InputCheckboxRule,
  Schema,
  Submit
} from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import type { PropsWithChildren } from 'react'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onCheckedChange = vi.fn()
const onSuccess = vi.fn()

function FormAndSchema({
  children,
  label
}: PropsWithChildren<{ label?: string }>) {
  const schema = new Schema({ infoCheckbox: new InputCheckboxRule() })

  return (
    <Form
      className="w-72"
      defaults={{ infoCheckbox: '' }}
      onSuccess={onSuccess}
      schema={schema}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <InfoCheckboxField
            control={form.control}
            inputName="infoCheckbox"
            label={label}
            onCheckedChange={onCheckedChange}
          >
            {children}
          </InfoCheckboxField>

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('InfoCheckboxField component', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<FormAndSchema label="Info Checkbox" />, {
    wrapper: WithToaster
  })

  await screen.getByLabelText('Info Checkbox').click()
  expect(onCheckedChange).toHaveBeenCalledOnce()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})

test('InfoCheckboxField component with children', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(
    <FormAndSchema>
      <p className="text-sm text-muted-foreground">
        I have read and agree to the{' '}
        <a
          className="underline hover:text-accent-foreground"
          href="#"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          className="underline hover:text-accent-foreground"
          href="#"
        >
          Privacy Policy
        </a>
      </p>
    </FormAndSchema>,
    { wrapper: WithToaster }
  )

  await screen.getByLabelText('I have read and agree').click()
  expect(onCheckedChange).toHaveBeenCalledOnce()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
