import { test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Textarea } from '@/index'

test('Textarea component', async () => {
  await render(
    <Textarea
      className="min-w-72"
      placeholder="Text goes here..."
    />
  )
})
