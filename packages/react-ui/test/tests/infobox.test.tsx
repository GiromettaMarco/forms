import { test } from 'vite-plus/test'
import { Infobox } from '@/components/infobox'
import { render } from '../fixtures/render'

test('Infobox component', async () => {
  await render(
    <Infobox>
      <p>
        After submitting a new email address, you will need to verify it before
        proceeding further in the dashboard.
      </p>
    </Infobox>
  )
})

test('Infobox component success variant', async () => {
  await render(
    <Infobox variant="success">
      <p>Your email address has been verified.</p>
    </Infobox>
  )
})

test('Infobox component warning variant', async () => {
  await render(
    <Infobox variant="warning">
      <p>Please proceed with caution, this cannot be undone.</p>
    </Infobox>
  )
})

test('Infobox component error variant', async () => {
  await render(
    <Infobox variant="error">
      <p>Operation failed due to a network error. Please try again later.</p>
    </Infobox>
  )
})
