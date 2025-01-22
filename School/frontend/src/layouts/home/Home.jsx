import React from 'react'
import Navbar from '../navbar/Navbar'
import Dashboard from '@/pages/dashboard/DashboardPage'
import { Outlet } from 'react-router'
// import { Navbar } from '../navbar/Navbar'

const Home = () => {
  return (
    <div>
        <main className='pt-16'>
          <h1>Hello World</h1>
        </main>
    </div>
  )
}

export default Home