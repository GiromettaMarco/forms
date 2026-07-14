import {
  Form,
  InfoCheckboxField,
  InputCheckboxRule,
  Schema,
  Submit
} from '@/index'
import { expect, vi } from 'vite-plus/test'
import { formRoute, test } from './utility'
import { WithToaster } from './with-toaster'
import { render } from 'vitest-browser-react'

const onCheckedChange = vi.fn()

function FormAndSchema() {
  const schema = new Schema({ infoCheckbox: new InputCheckboxRule() })

  return (
    <Form
      className="w-72"
      defaults={{ infoCheckbox: '' }}
      schema={schema}
      route={formRoute}
    >
      {({ form, loading }) => (
        <>
          <InfoCheckboxField
            control={form.control}
            inputName="infoCheckbox"
            label="Info Checkbox"
            onCheckedChange={onCheckedChange}
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('InfoCheckboxField component', async () => {
  const screen = await render(<FormAndSchema />, { wrapper: WithToaster })

  await screen.getByLabelText('Info Checkbox').click()
  expect(onCheckedChange).toHaveBeenCalled()
})
