import React from 'react'
import { BaseUrlProvider } from './global/baseurlcontext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LatestDeals from './pages/Latest_deals'
import TravelDeals from './pages/Travel_deals'
import Freebies from './pages/Freebies'
import Navbar from './components/Navbar'
import Store from './pages/Store'
import Products from './pages/Products'
import Category from './pages/Category'
import Feedback from './pages/Feedback'
import SendFeedback from './pages/SendFeedback'
export default function App() {
  return (
    <div>
      <BaseUrlProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/latest_deals" element={<LatestDeals/>} />
          <Route path="/freebies" element={<Freebies />} />
          <Route path="/travel_deals" element={<TravelDeals />} />
          <Route path="/store/:storename" element={<Store />}></Route>
          <Route path="/products/:productname" element={<Products />}></Route>
          <Route path="/category/:category" element={<Category />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/send_feedback" element={<SendFeedback />}></Route>
          <Route path="*" element={<Home />}/>
        </Routes>
      </BrowserRouter>
      </BaseUrlProvider>
    </div>
  )
}
