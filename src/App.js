//testing
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {About, AuthWrapper, Checkout, Error, Home, Cart, PrivateRoute, Products, SingleProductPage} from './pages'

function App() {
  return (
    <AuthWrapper>

    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<SingleProductPage />} />
        <Route 
          path='/checkout' 
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
        } />
        <Route path='*' element={<Error />} />

      </Routes>
      <Footer />
    </Router>
    </AuthWrapper>
  )
}

export default App
