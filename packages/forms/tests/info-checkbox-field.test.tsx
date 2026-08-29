import type { PropsWithChildren } from 'react'
import { expect, vi } from 'vite-plus/test'
import {
  Form,
  InfoCheckboxField,
  InputCheckboxRule,
  Schema,
  Submit
} from '@/index'
import { formRoute, inertiaResponseSuccess, render, test } from './utility'

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
      route={formRoute}
      schema={schema}
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
  const screen = await render(<FormAndSchema label="Info Checkbox" />)

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
    </FormAndSchema>
  )

  await screen.getByLabelText('I have read and agree').click()
  expect(onCheckedChange).toHaveBeenCalledOnce()

  // Submit
  await screen.getByText('Submit').click()
  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})
