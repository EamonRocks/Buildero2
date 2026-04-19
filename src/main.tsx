import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { LoadoutProvider } from './state/LoadoutContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadoutProvider>
      <App />
    </LoadoutProvider>
  </StrictMode>,
)
