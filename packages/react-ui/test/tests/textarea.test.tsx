import { test } from 'vite-plus/test'
import { Textarea } from '@/components/textarea'
import { render } from '../fixtures/render'

test('Textarea component', async () => {
  await render(
    <Textarea
      className="min-w-72"
      placeholder="Text goes here..."
    />
  )
})
