import React from 'react'
import Navigation from './customer/components/navigation/Navigation'
import HomePage from './customer/pages/HomePage/HomePage'
import Footer from './customer/components/Footer/Footer'
import Product from './customer/components/Product/Product'
import ProductDetails from './customer/components/ProductDetails/ProductDetails'

function App() {
  return (
    <>
      <div>
        <Navigation />
        <div>
          {/* <HomePage /> */}
          {/* <Product /> */}
          <ProductDetails />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App