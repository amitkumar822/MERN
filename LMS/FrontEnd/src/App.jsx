import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layout/MainLayout'
import HeroSection from './pages/student/HeroSection'
import LoginSignup from './pages/LoginSignup'
import Courses from './components/Courses'
import MyLearning from './components/MyLearning'
import Profile from './components/Profile'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        )
      },
      {
        path: "/login",
        element: <LoginSignup />,
      },
      {
        path: "/signup",
        element: <LoginSignup />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  }
])

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App