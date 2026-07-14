import { Calendar } from '@/index'
import { render } from 'vitest-browser-react'
import { test } from 'vite-plus/test'

test('Calendar component', async () => {
  await render(
    <Calendar
      className="w-72 rounded-md border"
      fixedWeeks={true}
    />
  )
})
