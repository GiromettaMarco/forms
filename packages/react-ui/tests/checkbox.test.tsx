import { test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Checkbox } from '@/index'

test('Checkbox with controlled state', async () => {
  await render(
    <div className="flex gap-2">
      <Checkbox checked={true} />
      <Checkbox checked={false} />
      <Checkbox checked="indeterminate" />
    </div>
  )
})
