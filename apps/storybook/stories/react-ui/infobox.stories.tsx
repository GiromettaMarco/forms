import type { Meta, StoryObj } from '@storybook/react-vite'
import { Infobox } from '@/react-ui/infobox'

const meta = {
  args: {
    className: 'w-120',
    variant: 'info'
  },
  argTypes: {
    children: { control: false },
    iconClassName: { control: 'text' },
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error']
    }
  },
  component: Infobox,
  parameters: {
    layout: 'centered'
  },
  title: 'React UI/Infobox'
} satisfies Meta<typeof Infobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p>
        If necessary, you may log out of all of your other browser sessions
        across all of your devices. This list may not be exhaustive. If you feel
        your account has been compromised, you should also update your password.
      </p>
    )
  }
}

export const Success: Story = {
  args: {
    children: <p>Your email address has been verified.</p>,
    variant: 'success'
  }
}

export const Info: Story = {
  args: {
    children: (
      <p>
        After submitting a new email address, you will need to verify it before
        proceeding further in the dashboard.
      </p>
    ),
    variant: 'info'
  }
}

export const Warning: Story = {
  args: {
    children: <p>Please proceed with caution, this cannot be undone.</p>,
    variant: 'warning'
  }
}

export const Error: Story = {
  args: {
    children: (
      <p>Operation failed due to a network error. Please try again later.</p>
    ),
    variant: 'error'
  }
}
