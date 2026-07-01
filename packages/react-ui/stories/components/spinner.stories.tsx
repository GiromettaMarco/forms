import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@/index'

const meta = {
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Spinner'
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
