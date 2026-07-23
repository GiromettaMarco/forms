import { test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Spinner } from '@/index'

test('Spinner component', async () => {
  await render(<Spinner />)
})
