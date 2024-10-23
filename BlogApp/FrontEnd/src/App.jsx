import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from "react-router-dom"
import Blogs from './pages/Blogs'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard","/login","/register"].includes(location.pathname);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      {/* Difining router */}
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App
