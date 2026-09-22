import { test } from 'vite-plus/test'
import { Spinner } from '@/components/spinner'
import { render } from '../fixtures/render'

test('Spinner component', async () => {
  await render(<Spinner />)
})
