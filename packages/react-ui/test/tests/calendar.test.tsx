import { test } from 'vite-plus/test'
import { Calendar } from '@/components/calendar'
import { render } from '../fixtures/render'

test('Calendar component', async () => {
  await render(
    <Calendar
      className="w-72 rounded-md border"
      fixedWeeks={true}
    />
  )
})
