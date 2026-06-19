import { describe, expect, test } from 'vite-plus/test'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './app'
import userEvent from '@testing-library/user-event'

describe('use tsv resolver', () => {
  test('default', async () => {
    render(<App />)

    const button = screen.getByTestId('submit')
    const input = screen.getByTestId('input')
    const log = screen.getByTestId('log')

    await userEvent.click(button)
    expect(screen.getByTestId('error').textContent).toBe('This is not "foo"!')
    expect(log.textContent).toBe('Invalid')

    fireEvent.change(input, { target: { value: 'foo' } })
    await userEvent.click(button)
    expect(log.textContent).toBe('Valid')
  })

  test('with native validation', async () => {
    render(<App shouldUseNativeValidation />)

    const button = screen.getByTestId('submit')
    const input = screen.getByTestId('input')
    const log = screen.getByTestId('log')

    await userEvent.click(button)
    expect(log.textContent).toBe('Invalid')

    fireEvent.change(input, { target: { value: 'foo' } })
    await userEvent.click(button)
    expect(log.textContent).toBe('Valid')
  })
})
