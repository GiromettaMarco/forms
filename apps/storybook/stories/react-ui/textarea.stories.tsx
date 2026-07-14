import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/react-ui/textarea'

const meta = {
  argTypes: {
    'aria-invalid': { control: 'boolean' }
  },
  args: {
    placeholder: 'Say something about yourself...'
  },
  component: Textarea,
  parameters: { layout: 'centered' },
  title: 'React UI/Textarea'
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'min-w-72'
  }
}
