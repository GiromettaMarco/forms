import { Textarea } from '@/index'
import { render } from 'vitest-browser-react'
import { test } from 'vite-plus/test'

test('Textarea component', async () => {
  await render(
    <Textarea
      className="min-w-72"
      placeholder="Text goes here..."
    />
  )
})
