import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={appStore}>
        <App />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
