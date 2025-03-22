import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
export default function Navbar() {
  const[storeList,setStoreList] = useState([]);
  const navigate = useNavigate();
  async function fetchStoreName(){
   try {
    let res = await fetch('http://localhost/product_api/list-storename.php');
    let data = await res.json();
    let storelistdata = data.map((item) => item.store_name);
    setStoreList(storelistdata);
   } catch (error) {
    console.log(error);
   }
  }

  async function handleSearch(e){
    if(e.key === 'Enter'){
       console.log(e.target.value);
      navigate(`/products/${e.target.value}`);
     }
  }

  useEffect(function(){
    fetchStoreName()},
    []);

  return (
    <div className="sticky-top mb-5 bg-white">
        <nav
          class="navbar navbar-expand-sm navbar-light bg-white border border-bottom  p-2"
        >
         <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">DealsInAmerica</Link>
         <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#asim">
           <span className="navbar-toggler-icon"></span>
         </button>
          <div className="collapse navbar-collapse" id="asim">
          
            <ul className="navbar-nav ms-auto"> 
            <div id='searchbox'>
                 <i class="fa-solid fa-magnifying-glass text-primary fw-bold"></i>
                 <input type="text" placeholder='Search deals' id='searchinput' onKeyDown={handleSearch}  />
            </div>

            <li class="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/latest_deals">Latest Deals</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="https://www.theblackfriday.com/weekly-ads" target='_blank'>Weekly Ads</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/freebies">Freebies</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/travel_deals">Travel Deals</Link>
            </li>
          </ul>
          </div>
        </nav>
        <nav className='p-1 shadow-sm px-5'>
          {
            storeList.map((item) => (
              <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2" to={`/store/${item}`} key={item}>{item}</Link>
            ))
          }
        </nav>
        
    </div>
  )
}
