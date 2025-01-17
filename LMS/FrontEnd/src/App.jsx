import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layout/MainLayout'
import HeroSection from './pages/student/HeroSection'
import LoginSignup from './pages/LoginSignup'
import Courses from './components/Courses'
import MyLearning from './components/MyLearning'
import Profile from './components/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'

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
      },


      // admin routes start here
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
        ]
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