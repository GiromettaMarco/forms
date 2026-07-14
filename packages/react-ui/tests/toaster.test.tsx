import { Button, Toaster, flash } from '@/index'
import { expect, test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'

test('Toaster component', async () => {
  const screen = await render(
    <div>
      <Toaster
        closeButton={true}
        position="bottom-center"
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => flash({ title: 'Default toaster' })}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            flash({
              description: 'Your submission was successful.',
              level: 'success',
              title: 'Success'
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            flash({
              description: 'You have a new message.',
              level: 'info',
              title: 'Notification'
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            flash({
              description: 'Autosave is disabled.',
              level: 'warning',
              title: 'Warning'
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            flash({
              description: 'Please try again later.',
              level: 'error',
              title: 'Network Error'
            })
          }
        >
          Error
        </Button>
      </div>
    </div>
  )

  await screen.getByText('Default').click()
  expect(screen.getByText('Default toaster')).toBeInTheDocument()

  await screen.getByText('Success').click()
  expect(
    screen.getByText('Your submission was successful.')
  ).toBeInTheDocument()

  await screen.getByText('Info').click()
  expect(screen.getByText('You have a new message.')).toBeInTheDocument()

  await screen.getByText('Warning').click()
  expect(screen.getByText('Autosave is disabled.')).toBeInTheDocument()

  await screen.getByText('Error').click()
  expect(screen.getByText('Network Error')).toBeInTheDocument()
})

test('Toaster component with an array of flash messages', async () => {
  const screen = await render(
    <div>
      <Toaster
        closeButton={true}
        position="bottom-center"
      />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => flash([])}
        >
          Empty
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            flash([
              { level: 'info', title: 'Message 1' },
              { level: 'info', title: 'Message 2' },
              { level: 'info', title: 'Message 3' }
            ])
          }
        >
          Multiple
        </Button>
      </div>
    </div>
  )

  await screen.getByText('Empty').click()
  await screen.getByText('Multiple').click()
  expect(screen.getByText('Message 1')).toBeInTheDocument()
  expect(screen.getByText('Message 2')).toBeInTheDocument()
  expect(screen.getByText('Message 3')).toBeInTheDocument()
})
