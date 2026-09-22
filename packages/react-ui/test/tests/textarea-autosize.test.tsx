import { test } from 'vite-plus/test'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from '@/components/input-group'
import { TextareaAutosize } from '@/components/textarea-autosize'
import { render } from '../fixtures/render'

test('TextareaAutosize component', async () => {
  await render(
    <TextareaAutosize
      className="min-w-72"
      placeholder="Autoresize textarea..."
    />
  )
})

test('TextareaAutosize component inside an InputGroup', async () => {
  await render(
    <InputGroup>
      <TextareaAutosize
        className="min-w-72 border-none shadow-none focus-visible:border-none focus-visible:ring-0 dark:bg-transparent"
        data-slot="input-group-control"
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          className="ml-auto"
          size="sm"
          variant="default"
        >
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
})
