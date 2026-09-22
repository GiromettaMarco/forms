import { useEffect, type PropsWithChildren } from 'react'

function applyTheme(theme: 'dark' | 'light') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: PropsWithChildren) {
  // In browser mode
  useEffect(() => {
    const handleSystemThemeChange = (event: MediaQueryListEvent) =>
      applyTheme(event.matches ? 'dark' : 'light')

    // Get the MediaQueryList object
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    // Set initial value
    applyTheme(mediaQueryList.matches ? 'dark' : 'light')

    // Add listener
    mediaQueryList?.addEventListener('change', handleSystemThemeChange)

    // Remove listener
    return () => {
      mediaQueryList?.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  return children
}
