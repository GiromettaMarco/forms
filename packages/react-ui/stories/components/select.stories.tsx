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
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  title: 'Components/Select'
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Field>
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
        <SelectItem value="apple">Broccoli</SelectItem>
        <SelectItem value="banana">Cabbage</SelectItem>
        <SelectItem value="pineapple">Peperoni</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</Field>`
      }
    }
  },
  render: () => (
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
            <SelectItem value="apple">Broccoli</SelectItem>
            <SelectItem value="banana">Cabbage</SelectItem>
            <SelectItem value="pineapple">Peperoni</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

export const Popper: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Field>
  <FieldLabel htmlFor="food">Food</FieldLabel>
  <Select>
    <SelectTrigger
      className="w-full max-w-48"
      id="food"
    >
      <SelectValue placeholder="Select a food" />
    </SelectTrigger>
    <SelectContent position='popper'>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem value="apple">Broccoli</SelectItem>
        <SelectItem value="banana">Cabbage</SelectItem>
        <SelectItem value="pineapple">Peperoni</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</Field>`
      }
    }
  },
  render: () => (
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
            <SelectItem value="apple">Broccoli</SelectItem>
            <SelectItem value="banana">Cabbage</SelectItem>
            <SelectItem value="pineapple">Peperoni</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
