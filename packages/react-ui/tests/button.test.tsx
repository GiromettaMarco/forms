import { expect, test, vi } from 'vite-plus/test'
import { Button } from '@/index'
import { render } from 'vitest-browser-react'

test('Button component', async () => {
  const onClick = vi.fn()

  const screen = await render(<Button onClick={onClick}>Submit</Button>)

  const button = screen.getByText('Submit')

  await button.click()

  expect(onClick).toHaveBeenCalled()
})
