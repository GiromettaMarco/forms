import { Calendar as CalendarOriginal } from '@gmcode/react-ui'
import type { ComponentProps } from 'react'

export function Calendar({
  buttonVariant = 'ghost',
  captionLayout = 'label',
  mode = 'single',
  showOutsideDays = true,
  ...props
}: ComponentProps<typeof CalendarOriginal>) {
  return (
    // @ts-expect-error react-day-picker typing
    <CalendarOriginal
      buttonVariant={buttonVariant}
      captionLayout={captionLayout}
      mode={mode}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  )
}
