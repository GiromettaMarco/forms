import { flash } from '@gmcode/react-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/react-ui/button'
import { Toaster } from '@/react-ui/toaster'

const meta = {
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  argTypes: {
    closeButton: {
      control: 'boolean'
    },
    duration: {
      control: 'number',
      type: 'number'
    },
    position: {
      control: 'select',
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
      control: 'boolean',
      type: 'boolean'
    }
  },
  component: Toaster,
  parameters: {
    disableToaster: true,
    layout: 'centered'
  },
  title: 'React UI/Toaster'
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props, context) => (
    <div>
      <Toaster
        theme={context.globals.theme || 'system'}
        {...props}
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
}

export const Array: Story = {
  render: (props, context) => (
    <div>
      <Toaster
        theme={context.globals.theme || 'system'}
        {...props}
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
}
