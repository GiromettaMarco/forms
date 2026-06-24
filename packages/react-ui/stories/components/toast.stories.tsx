import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'
import { Toaster } from '@/components/toast'
import { flash } from '@/lib/flash'

const meta = {
  argTypes: {
    duration: {
      control: 'number'
    },
    richColors: {
      control: 'boolean'
    }
  },
  component: Toaster,
  tags: ['autodocs'],
  title: 'Components/Toast'
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    flash({
      title: 'Default toaster'
    })

    await waitFor(() =>
      expect(canvas.getByText('Default toaster')).toBeInTheDocument()
    )
  },
  render: (props, context) => (
    <Toaster
      theme={context.globals.theme || 'system'}
      {...props}
    />
  )
}

export const Success: Story = {
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  play: async ({ canvas }) => {
    flash({
      description: 'Your submission was successful.',
      level: 'success',
      title: 'Success'
    })

    await waitFor(() => expect(canvas.getByText('Success')).toBeInTheDocument())
  },
  render: (props, context) => (
    <Toaster
      theme={context.globals.theme || 'system'}
      {...props}
    />
  )
}

export const Info: Story = {
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  play: async ({ canvas }) => {
    flash({
      description: 'You have a new message.',
      level: 'info',
      title: 'Notification'
    })

    await waitFor(() =>
      expect(canvas.getByText('Notification')).toBeInTheDocument()
    )
  },
  render: (props, context) => (
    <Toaster
      theme={context.globals.theme || 'system'}
      {...props}
    />
  )
}

export const Warning: Story = {
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  play: async ({ canvas }) => {
    flash({
      description: 'Autosave is disabled.',
      level: 'warning',
      title: 'Warning'
    })

    await waitFor(() => expect(canvas.getByText('Warning')).toBeInTheDocument())
  },
  render: (props, context) => (
    <Toaster
      theme={context.globals.theme || 'system'}
      {...props}
    />
  )
}

export const Error: Story = {
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  play: async ({ canvas }) => {
    flash({
      description: 'Please try again later.',
      level: 'error',
      title: 'Network Error'
    })

    await waitFor(() =>
      expect(canvas.getByText('Network Error')).toBeInTheDocument()
    )
  },
  render: (props, context) => (
    <Toaster
      theme={context.globals.theme || 'system'}
      {...props}
    />
  )
}

export const Multiple: Story = {
  args: {
    closeButton: true,
    position: 'bottom-center'
  },
  play: async ({ canvas }) => {
    flash([
      { level: 'info', title: 'Message 1' },
      { level: 'info', title: 'Message 2' },
      { level: 'info', title: 'Message 3' }
    ])

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
    <Toaster
      theme={context.globals.theme || 'system'}
      {...props}
    />
  )
}
