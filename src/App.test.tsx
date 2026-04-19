import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import { LoadoutProvider } from './state/LoadoutContext'

describe('App', () => {
  it('renders the logo', () => {
    render(
      <LoadoutProvider>
        <App />
      </LoadoutProvider>
    )
    // Check for the logo image
    expect(screen.getByAltText(/Archero 2 Builder/i)).toBeInTheDocument()
  })

  it('renders the dashboard with default character', () => {
    render(
      <LoadoutProvider>
        <App />
      </LoadoutProvider>
    )
    // Default character is 'atreus', look for the image alt text or button name
    expect(screen.getAllByAltText(/atreus/i).length).toBeGreaterThan(0)
  })
})
