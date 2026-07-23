import { test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import { Label, RadioGroup, RadioGroupItem } from '@/index'

test('RadioGroup component', async () => {
  await render(
    <RadioGroup
      className="w-96"
      defaultValue="auto"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="auto"
          value="auto"
        />
        <Label htmlFor="auto">Auto</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="light"
          value="light"
        />
        <Label htmlFor="light">Light</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          id="dark"
          value="dark"
        />
        <Label htmlFor="dark">Dark</Label>
      </div>
    </RadioGroup>
  )
})
