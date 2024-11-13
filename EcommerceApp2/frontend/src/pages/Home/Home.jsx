import React from 'react'
import CategoryList from '../../components/CategoryProduct/CategoryList'
import BannerSlideProduct from '../../components/Banner/BannerSlideProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerSlideProduct images={imageUrl} />
      {/* Add your other components or pages here */}
    </div>
  )
}

export default Home

const imageUrl = [
  {
    url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6ff0db0ee2c1d3cc.jpg?q=20',
    alt: 'Image 1'
  },
  {
    url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1957c92d54dccbb8.jpg?q=20',
    alt: 'Image 2'
  },
  {
    url: 'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/412dd36cba1ca722.jpg?q=20',
    alt: 'Image 3'
  },
]