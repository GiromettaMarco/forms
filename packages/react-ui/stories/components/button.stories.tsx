import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, waitFor } from 'storybook/test'
import { Button } from '@/index'
import { MenuIcon } from 'lucide-react'

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
  args: { onClick: fn() },
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Components/Button'
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click Me'
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'))
    await waitFor(() => expect(args.onClick).toHaveBeenCalled())
  }
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <MenuIcon />
        <span className="sr-only">open menu</span>
      </>
    ),
    size: 'icon'
  }
}

export const Delete: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive'
  }
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a
        href="https://storybook.js.org/"
        target="_blank"
      >
        Storybook
      </a>
    ),
    variant: 'link'
  }
}
