import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/index'

const meta = {
  args: {
    placeholder: 'Text goes here...'
  },
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Textarea'
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'min-w-72'
  }
}

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    className: 'min-w-72'
  }
}

export const Custom: Story = {
  args: {
    className: 'min-w-72 text-lg font-bold',
    rows: 4
  }
}
