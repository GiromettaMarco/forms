import type { Meta, StoryObj } from '@storybook/react-vite'
import { Submit } from '@/index'

const meta = {
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg']
    },
    variant: {
      control: 'radio',
      options: [
        'default',
        'secondary',
        'link',
        'outline',
        'ghost',
        'destructive'
      ]
    }
  },
  component: Submit,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Submit'
} satisfies Meta<typeof Submit>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true
  }
}
