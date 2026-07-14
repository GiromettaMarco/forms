import { Spinner } from '@/index'
import { render } from 'vitest-browser-react'
import { test } from 'vite-plus/test'

test('Spinner component', async () => {
  await render(<Spinner />)
})
