import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/react-ui/button'
import { MenuIcon } from 'lucide-react'

const meta = {
  argTypes: {
    asChild: {
      control: false
    },
    disabled: {
      control: 'boolean'
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg']
    },
    variant: {
      control: 'select',
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
  args: {
    size: 'default',
    variant: 'default'
  },
  component: Button,
  parameters: { layout: 'centered' },
  title: 'React UI/Button'
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button'
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
