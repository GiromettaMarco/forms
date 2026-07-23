import { toast } from 'sonner'

export interface FlashMessage {
  description?: string | null
  level?: 'success' | 'info' | 'warning' | 'error' | null
  title: string
}

function flashSingle(message: FlashMessage) {
  switch (message.level) {
    case 'success':
      toast.success(message.title, {
        classNames: { icon: 'text-success-foreground' },
        description: message.description
      })
      break

    case 'info':
      toast.info(message.title, {
        classNames: { icon: 'text-info-foreground' },
        description: message.description
      })
      break

    case 'warning':
      toast.warning(message.title, {
        classNames: { icon: 'text-warning-foreground' },
        description: message.description
      })
      break

    case 'error':
      toast.error(message.title, {
        classNames: { icon: 'text-error-foreground' },
        description: message.description
      })
      break

    default:
      toast(message.title, { description: message.description })
      break
  }
}

export function flash(messages: FlashMessage | FlashMessage[]) {
  if (Array.isArray(messages)) {
    messages.forEach((message) => {
      flashSingle(message)
    })

    return
  }

  flashSingle(messages)
}
