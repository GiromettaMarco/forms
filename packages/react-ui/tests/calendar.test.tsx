import { test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Calendar } from '@/index'

test('Calendar component', async () => {
  await render(
    <Calendar
      className="w-72 rounded-md border"
      fixedWeeks={true}
    />
  )
})
