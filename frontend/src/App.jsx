import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPop from './components/Loginpop/LoginPop'
import Order from './pages/Order/Order'

const App = () => {


  const [showlogin, setshowlogin] = useState(false);

  return (
    <>
    {showlogin ? <LoginPop setshowlogin = {setshowlogin}/> : <></>}
    <div className='app'>
        <Navbar setshowlogin={setshowlogin}/>
        <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/cart' element={ <Cart/> }/>
            <Route path='/order' element={<PlaceOrder/> }/>
            <Route path='/orders' element={<Order/> }/>
        </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App