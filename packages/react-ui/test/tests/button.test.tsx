import { MenuIcon } from 'lucide-react'
import { expect, test, vi } from 'vite-plus/test'
import { Button } from '@/components/button'
import { render } from '../fixtures/render'

test('Button component', async () => {
  const onClick = vi.fn()

  const screen = await render(<Button onClick={onClick}>Submit</Button>)

  const button = screen.getByText('Submit')

  await button.click()

  expect(onClick).toHaveBeenCalled()
})

test('Button component with icon', async () => {
  await render(
    <Button
      aria-label="open menu"
      size="icon"
    >
      <MenuIcon />
    </Button>
  )
})

test('Button component destructive variant', async () => {
  await render(<Button variant="destructive">Delete</Button>)
})

test('Button component as child', async () => {
  await render(
    <Button
      asChild
      variant="link"
    >
      <a
        href="https://vitest.dev/"
        target="_blank"
      >
        Vitest
      </a>
    </Button>
  )
})
