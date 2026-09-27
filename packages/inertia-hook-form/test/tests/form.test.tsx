import { expect, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Form } from '../components/form'
import { test } from '../fixtures/test'
import {
  inertiaResponseFiledError,
  inertiaResponseRootError,
  inertiaResponseSuccess
} from '../mocks/handlers'

const onError = vi.fn()
const onSuccess = vi.fn()

test('form with successful response', async ({ worker }) => {
  worker.use(inertiaResponseSuccess)

  const screen = await render(
    <Form
      onError={onError}
      onSuccess={onSuccess}
    />
  )

  await screen.getByLabelText('Name:').fill('John')
  await screen.getByText('Submit').click()

  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})

test('form with set defaults on success', async ({ worker }) => {
  worker.use(inertiaResponseSuccess)

  const screen = await render(
    <Form
      onError={onError}
      onSuccess={onSuccess}
      setDefaultsOnSuccess
    />
  )

  const input = screen.getByLabelText('Name:')

  await input.fill('John')
  await screen.getByText('Submit').click()

  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
  expect(input).toHaveValue('John')
})

test('form without reset on success', async ({ worker }) => {
  worker.use(inertiaResponseSuccess)

  const screen = await render(
    <Form
      onError={onError}
      onSuccess={onSuccess}
      resetOnSuccess={false}
    />
  )

  const input = screen.getByLabelText('Name:')

  await input.fill('John')
  await screen.getByText('Submit').click()

  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
  expect(input).toHaveValue('John')

  await screen.getByText('Reset').click()

  expect(input).toHaveValue('')
})

test('form with server field error', async ({ worker }) => {
  worker.use(inertiaResponseFiledError)

  const screen = await render(
    <Form
      onError={onError}
      onSuccess={onSuccess}
    />
  )

  await screen.getByLabelText('Name:').fill('John')
  await screen.getByText('Submit').click()

  // wait before throwing an error if it cannot find an element
  await expect
    .element(screen.getByText('This username is already in taken.'))
    .toBeInTheDocument()
  expect(onError).toHaveBeenCalledOnce()
})

test('form with server root error', async ({ worker }) => {
  worker.use(inertiaResponseRootError)

  const screen = await render(
    <Form
      onError={onError}
      onSuccess={onSuccess}
    />
  )

  await screen.getByLabelText('Name:').fill('John')
  await screen.getByText('Submit').click()

  // wait before throwing an error if it cannot find an element
  await expect
    .element(screen.getByText('These credentials do not match our records.'))
    .toBeInTheDocument()
  expect(onError).toHaveBeenCalledOnce()
})

test('form with defaults', async ({ worker }) => {
  worker.use(inertiaResponseSuccess)

  const screen = await render(
    <Form
      defaults={{ name: 'John' }}
      onError={onError}
      onSuccess={onSuccess}
    />
  )

  expect(screen.getByLabelText('Name:')).toHaveValue('John')

  await screen.getByText('Submit').click()

  await vi.waitFor(async () => {
    expect(onSuccess).toHaveBeenCalledOnce()
  })
})

test('form with no defaults and validation', async ({ worker }) => {
  worker.use(inertiaResponseSuccess)

  const screen = await render(
    <Form
      onError={onError}
      onSuccess={onSuccess}
    />
  )

  await screen.getByText('Submit').click()

  expect(screen.getByText('required')).toBeInTheDocument()
})
