import { Toaster } from '@gmcode/react-ui'
import { useEffect, type PropsWithChildren } from 'react'
import { toast } from 'sonner'

export function ToasterProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    return () => {
      toast.dismiss()
    }
  }, [])

  return (
    <>
      <Toaster
        closeButton={true}
        // duration={500_000_000}
        position="bottom-center"
        theme="system"
      />
      {children}
    </>
  )
}
