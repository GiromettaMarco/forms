import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, CornerDownLeft, Mail, RefreshCcw, Search } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from '@/react-ui/input-group'

const meta = {
  component: InputGroup,
  parameters: {
    layout: 'centered'
  },
  title: 'React UI/Input Group'
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-96'
  },
  render: (props) => (
    <InputGroup {...props}>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}

export const Textarea: Story = {
  args: {
    className: 'w-96'
  },
  render: (props) => (
    <InputGroup {...props}>
      <InputGroupTextarea
        className="min-h-50"
        id="textarea-code-32"
        placeholder="alert('Hello, world!');"
      />
      <InputGroupAddon
        align="block-end"
        className="border-t"
      >
        <InputGroupText>Line 1, Column 1</InputGroupText>
        <InputGroupButton
          className="ml-auto"
          size="sm"
          variant="default"
        >
          Run <CornerDownLeft />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon
        align="block-start"
        className="border-b"
      >
        <InputGroupText className="font-mono font-medium">
          script.js
        </InputGroupText>
        <InputGroupButton
          aria-label="Refresh"
          className="ml-auto"
          size="icon-xs"
        >
          <RefreshCcw />
        </InputGroupButton>
        <InputGroupButton
          aria-label="Copy"
          size="icon-xs"
          variant="ghost"
        >
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export const Addon: Story = {
  args: {
    className: 'grid w-96 gap-6'
  },
  render: (props) => (
    <div {...props}>
      <InputGroup>
        <InputGroupInput
          placeholder="Enter your email"
          type="email"
        />
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Search">
            <Search />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
