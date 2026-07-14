import { Infobox } from '@/index'
import { render } from 'vitest-browser-react'
import { test } from 'vite-plus/test'

test('Infobox component', async () => {
  await render(
    <Infobox className="w-120">
      <p>Your email address has been verified.</p>
    </Infobox>
  )
})
