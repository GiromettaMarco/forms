import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/react-ui/button'
import { Toaster } from '@/react-ui/toaster'
import { flash } from '@gmcode/react-ui'

const meta = {
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
  args: {
    closeButton: true,
    position: 'bottom-center'
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
