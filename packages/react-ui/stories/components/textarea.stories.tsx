import { Textarea } from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    placeholder: 'Text goes here...'
  }
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Invalid: Story = {
  args: {
    'aria-invalid': true
  }
}

export const Custom: Story = {
  args: {
    className: 'text-lg font-bold',
    rows: 4
  }
}
