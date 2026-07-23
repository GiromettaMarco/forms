import { expect, test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Button, Toaster, flash } from '@/index'

test('Toaster component', async () => {
  const screen = await render(
    <div>
      <Toaster
        closeButton={true}
        position="bottom-center"
      />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => flash({ title: 'Default toaster' })}
          variant="outline"
        >
          Default
        </Button>
        <Button
          onClick={() =>
            flash({
              description: 'Your submission was successful.',
              level: 'success',
              title: 'Success'
            })
          }
          variant="outline"
        >
          Success
        </Button>
        <Button
          onClick={() =>
            flash({
              description: 'You have a new message.',
              level: 'info',
              title: 'Notification'
            })
          }
          variant="outline"
        >
          Info
        </Button>
        <Button
          onClick={() =>
            flash({
              description: 'Autosave is disabled.',
              level: 'warning',
              title: 'Warning'
            })
          }
          variant="outline"
        >
          Warning
        </Button>
        <Button
          onClick={() =>
            flash({
              description: 'Please try again later.',
              level: 'error',
              title: 'Network Error'
            })
          }
          variant="outline"
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
          onClick={() => flash([])}
          variant="outline"
        >
          Empty
        </Button>
        <Button
          onClick={() =>
            flash([
              { level: 'info', title: 'Message 1' },
              { level: 'info', title: 'Message 2' },
              { level: 'info', title: 'Message 3' }
            ])
          }
          variant="outline"
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
