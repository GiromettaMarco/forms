import type { ComponentProps } from 'react'
import { default as TextareaAutosizePrimitive } from 'react-textarea-autosize'
import { cn } from '@/lib/utils'

export function TextareaAutosize({
  className,
  'data-slot': dataSlot = 'textarea',
  ...props
}: ComponentProps<typeof TextareaAutosizePrimitive> & {
  'data-slot'?: string
}) {
  return (
    <TextareaAutosizePrimitive
      className={cn(
        'flex field-sizing-content w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        className
      )}
      data-slot={dataSlot}
      {...props}
    />
  )
}
