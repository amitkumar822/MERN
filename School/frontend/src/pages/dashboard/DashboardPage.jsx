import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet } from 'react-router'

const DashboardPage = () => {
  return (
    <div className='w-full h-screen fixed'>
      <div className='flex gap-2'>
        <LeftSidebar />
        <div className='w-full pt-2'>
            <Outlet />
        </div>
    </div>
    </div>
  )
}

export default DashboardPage