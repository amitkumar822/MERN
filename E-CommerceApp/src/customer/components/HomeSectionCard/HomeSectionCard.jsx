import React from 'react'

function HomeSectionCard({products}) {
  return (
    <div className=' cursor-pointer flex flex-col items-center rounded-lg shadow-lg overflow-hidden w-[14rem] mx-3 border border-gray-200'>
        {/* image */}
      <div className='h-[13rem] w-[10rem] bg-blue-200'>
        <img 
        className='object-cover object-top w-full h-full'
        src={products?.imageUrl} alt="" />
      </div>

      <div className='p-4'>
        <h1 className='text-lg font-medium text-gray-900'>{products.title}</h1>
        <p className='mt-2 text-sm text-gray-500'>{products.brand}</p>
      </div>
    </div>
  )
}

export default HomeSectionCard
