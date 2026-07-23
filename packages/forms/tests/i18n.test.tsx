import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import {
  ErrorMonitor,
  Form,
  InputTextRule,
  Schema,
  Submit,
  TextField,
  i18n
} from '@/index'
import { formRoute, inertiaResponseSuccess, test } from './utility'
import { WithToaster } from './with-toaster'

function Default() {
  const schema = new Schema({
    name: new InputTextRule({ maxChars: 20, minChars: 4 })
  })

  return (
    <Form
      className="w-72"
      defaults={{ name: '' }}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <TextField
            control={form.control}
            inputName="name"
            label="Name"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('I18n with default locales', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  await i18n.changeLanguage('it')

  // Render
  const screen = await render(<Default />, { wrapper: WithToaster })

  await screen.getByLabelText('Name').fill('Jim')
  await screen.getByText('Invia').click()
  expect(
    screen.getByText('Il campo deve contenere almeno 4 caratteri.')
  ).toBeInTheDocument()

  await i18n.changeLanguage('en')
})

function Custom() {
  const schema = new Schema({
    name: new InputTextRule({
      maxChars: 20,
      messages: {
        maxChars: 'name.maxChars',
        minChars: 'name.minChars',
        required: 'name.required'
      },
      minChars: 4
    })
  })

  return (
    <Form
      className="w-72"
      defaults={{ name: '' }}
      route={formRoute}
      schema={schema}
    >
      {({ form, loading }) => (
        <>
          <TextField
            control={form.control}
            inputName="name"
            label="Name"
          />

          <Submit loading={loading} />
        </>
      )}
    </Form>
  )
}

test('I18n with custom strings', async ({ worker }) => {
  // Rest handler
  worker.use(inertiaResponseSuccess)

  // Render
  const screen = await render(<Custom />, { wrapper: WithToaster })

  await screen.getByLabelText('Name').fill('Jim')
  await screen.getByText('Submit').click()
  expect(
    screen.getByText(
      'Your name must be at least 4 characters. The chosen name is 3 characters long.'
    )
  ).toBeInTheDocument()
})

test('ErrorMonitor without i18next provider fallback', async () => {
  const consoleMock = vi
    .spyOn(console, 'warn')
    .mockImplementation(() => undefined)

  // Render
  const screen = await render(
    <ErrorMonitor error={{ message: 'No i18next provider' }} />,
    { wrapper: WithToaster }
  )

  expect(screen.getByText('No i18next provider')).toBeInTheDocument()
  expect(consoleMock).toHaveBeenCalledOnce()

  consoleMock.mockReset()
})
