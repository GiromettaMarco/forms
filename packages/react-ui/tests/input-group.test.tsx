import {
  Check,
  Copy,
  CornerDownLeft,
  CreditCard,
  Mail,
  RefreshCcw,
  Search
} from 'lucide-react'
import { expect, test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from '@/index'

test('InputGroup components', async () => {
  await render(
    <InputGroup className="w-96">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
})

test('InputGroup with textarea', async () => {
  await render(
    <InputGroup className="w-96">
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
})

test('InputGroup with Addon', async () => {
  const screen = await render(
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
          align="inline-end"
          data-testid="addon-text"
        >
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
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
          <InputGroupButton
            aria-label="Search"
            data-testid="addon-button"
          >
            <Search />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )

  const addonButton = screen.getByTestId('addon-button')
  const addonText = screen.getByTestId('addon-text')
  const inputWithAddonText = screen.getByTestId('input-with-addon-test')

  await addonButton.click()

  expect(addonButton).toHaveFocus()

  await addonText.click()

  expect(inputWithAddonText).toHaveFocus()
})
