import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from '@/index'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Check,
  Copy,
  CornerDownLeft,
  CreditCard,
  Mail,
  RefreshCcw,
  Search
} from 'lucide-react'
import { expect } from 'storybook/test'

const meta = {
  title: 'Components/Input Group',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup className="w-96">
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
</InputGroup>`
      }
    }
  }
}

export const Textarea: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupTextarea
        id="textarea-code-32"
        placeholder="console.log('Hello, world!');"
        className="min-h-50"
      />
      <InputGroupAddon
        align="block-end"
        className="border-t"
      >
        <InputGroupText>Line 1, Column 1</InputGroupText>
        <InputGroupButton
          size="sm"
          className="ml-auto"
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
          className="ml-auto"
          size="icon-xs"
        >
          <RefreshCcw />
        </InputGroupButton>
        <InputGroupButton
          variant="ghost"
          size="icon-xs"
        >
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup className="w-96">
  <InputGroupTextarea
    id="textarea-code-32"
    placeholder="console.log('Hello, world!');"
    className="min-h-50"
  />
  <InputGroupAddon
    align="block-end"
    className="border-t"
  >
    <InputGroupText>Line 1, Column 1</InputGroupText>
    <InputGroupButton
      size="sm"
      className="ml-auto"
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
      className="ml-auto"
      size="icon-xs"
    >
      <RefreshCcw />
    </InputGroupButton>
    <InputGroupButton
      variant="ghost"
      size="icon-xs"
    >
      <Copy />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`
      }
    }
  }
}

export const Addon: Story = {
  render: () => (
    <div className="grid w-96 gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          data-testid="input-with-addon-test"
          placeholder="0.00"
        />
        <InputGroupAddon
          data-testid="addon-text"
          align="inline-end"
        >
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder="Enter your email"
        />
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCard />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Check />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton data-testid="addon-button">
            <Search />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const addonButton = canvas.getByTestId('addon-button')
    const addonText = canvas.getByTestId('addon-text')
    const inputWithAddonText = canvas.getByTestId('input-with-addon-test')

    await userEvent.click(addonButton)
    await expect(addonButton).toHaveFocus()
    await userEvent.click(addonText)
    await expect(inputWithAddonText).toHaveFocus()
  },
  parameters: {
    docs: {
      source: {
        code: `<div className="grid w-96 gap-6">
  <InputGroup>
    <InputGroupAddon>
      <InputGroupText>$</InputGroupText>
    </InputGroupAddon>
    <InputGroupInput placeholder="0.00" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>USD</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput
      type="email"
      placeholder="Enter your email"
    />
    <InputGroupAddon>
      <Mail />
    </InputGroupAddon>
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Card number" />
    <InputGroupAddon>
      <CreditCard />
    </InputGroupAddon>
    <InputGroupAddon align="inline-end">
      <Check />
    </InputGroupAddon>
  </InputGroup>
</div>`
      }
    }
  }
}
