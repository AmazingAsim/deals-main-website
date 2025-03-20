import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LatestDeals from './pages/Latest_deals'
import TravelDeals from './pages/Travel_deals'
import Freebies from './pages/Freebies'
import Navbar from './components/Navbar'
import Store from './pages/Store'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/latest_deals" element={<LatestDeals/>} />
          <Route path="/freebies" element={<Freebies />} />
          <Route path="/travel_deals" element={<TravelDeals />} />
          <Route path="/store/:storename" element={<Store />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
