import React from 'react'
import LoginSignup from './pages/LoginSignup'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/ThemeProvider'

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
        <LoginSignup />
      </ThemeProvider>
    </div>
  )
}

export default App