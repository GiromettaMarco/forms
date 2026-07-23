import { test } from 'vite-plus/test'
import { render } from 'vitest-browser-react'
import {
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/index'

test('Select component', async () => {
  await render(
    <Field>
      <FieldLabel htmlFor="food">Food</FieldLabel>
      <Select>
        <SelectTrigger
          className="w-full max-w-48"
          id="food"
        >
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="cabbage">Cabbage</SelectItem>
            <SelectItem value="peperoni">Peperoni</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
})

test('Select component with popper position', async () => {
  await render(
    <Field>
      <FieldLabel htmlFor="food">Food</FieldLabel>
      <Select>
        <SelectTrigger
          className="w-full max-w-48"
          id="food"
        >
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="cabbage">Cabbage</SelectItem>
            <SelectItem value="peperoni">Peperoni</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
})
