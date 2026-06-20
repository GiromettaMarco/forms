import { afterEach } from 'vite-plus/test'
import { cleanup } from '@testing-library/react'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
