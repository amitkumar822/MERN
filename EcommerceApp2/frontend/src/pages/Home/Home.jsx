import React from 'react'
import CategoryList from '../../components/CategoryProduct/CategoryList'
import BannerSlideProduct from '../../components/Banner/BannerSlideProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerSlideProduct />
      {/* Add your other components or pages here */}
    </div>
  )
}

export default Home