import { test } from 'vite-plus/test'
import { Checkbox } from '@/components/checkbox'
import { render } from '../fixtures/render'

test('Checkbox with controlled state', async () => {
  await render(
    <div className="flex gap-2">
      <Checkbox checked={true} />
      <Checkbox checked={false} />
      <Checkbox checked="indeterminate" />
    </div>
  )
})
