import { expect, test, vi } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Button } from '@/index'

test('Button component', async () => {
  const onClick = vi.fn()

  const screen = await render(<Button onClick={onClick}>Submit</Button>)

  const button = screen.getByText('Submit')

  await button.click()

  expect(onClick).toHaveBeenCalled()
})
