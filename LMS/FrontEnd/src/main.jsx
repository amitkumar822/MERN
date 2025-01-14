import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from './components/ThemeProvider'
import { useGetUserProfileQuery } from './features/api/authApi'
import LoadingSpinner from './components/LoadingSpinner'

const LoadingWrap = ({ children }) => {
  const { isLoading } = useGetUserProfileQuery();
  return (
    <>
      {
        isLoading ? <>
          <LoadingSpinner />
        </> : <>{children}</>
      }
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={appStore}>
        <LoadingWrap>
          <App />
        </LoadingWrap>
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
