import React from 'react'
import { useParams } from 'react-router'

const CategoryProduct = () => {
    const paramsCategory = useParams();
    console.log(paramsCategory) // Output: { category: 'electronics' }
  return (
    <div className='mix-blend-multiply'>
        <h1>Category: {paramsCategory?.categoryName}</h1>
    </div>
  )
}

export default CategoryProduct