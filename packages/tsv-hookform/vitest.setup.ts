import { cleanup } from '@testing-library/react'
import { afterEach } from 'vite-plus/test'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
