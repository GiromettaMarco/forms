import { Button, Toaster, flash } from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

const meta = {
  argTypes: {
    closeButton: {
      control: 'boolean'
    },
    duration: {
      control: 'number'
    },
    position: {
      control: 'radio',
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'top-center',
        'bottom-center'
      ]
    },
    richColors: {
      control: 'boolean'
    }
  },
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Toast'
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Default'))
    await waitFor(() =>
      expect(canvas.getByText('Default toaster')).toBeInTheDocument()
    )
    await userEvent.click(canvas.getByText('Success'))
    await waitFor(() =>
      expect(
        canvas.getByText('Your submission was successful.')
      ).toBeInTheDocument()
    )
    await userEvent.click(canvas.getByText('Info'))
    await waitFor(() =>
      expect(canvas.getByText('You have a new message.')).toBeInTheDocument()
    )
    await userEvent.click(canvas.getByText('Warning'))
    await waitFor(() =>
      expect(canvas.getByText('Autosave is disabled.')).toBeInTheDocument()
    )
    await userEvent.click(canvas.getByText('Error'))
    await waitFor(() =>
      expect(canvas.getByText('Network Error')).toBeInTheDocument()
    )
  },
  render: (props, context) => (
    <div>
      <Toaster
        theme={context.globals.theme || 'system'}
        {...props}
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
}

export const Array: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Empty'))
    await userEvent.click(canvas.getByText('Multiple'))
    await waitFor(() =>
      expect(canvas.getByText('Message 1')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(canvas.getByText('Message 2')).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(canvas.getByText('Message 3')).toBeInTheDocument()
    )
  },
  render: (props, context) => (
    <div>
      <Toaster
        theme={context.globals.theme || 'system'}
        {...props}
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
}
