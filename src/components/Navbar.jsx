import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useBaseUrl } from '../global/baseurlcontext';
import logo from '../assets/logo.png'
export default function Navbar() {
  const [storeList, setStoreList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();

  async function getAllCategories() {
    let res = await fetch(`${baseUrl}/product_api/list-category.php`);
    let data = await res.json();
    let List = data.map((item) => item.category);
    setCategoryList(List);
  }

  async function fetchStoreName() {
    try {
      let res = await fetch(`${baseUrl}/product_api/list-storename.php`);
      let data = await res.json();
      let storelistdata = data.map((item) => item.store_name);
      setStoreList(storelistdata);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearch(e) {
    setSearch(e.target.value);
    if (e.key === 'Enter') {
      navigate(`/products/${e.target.value}`);
    }
  }

  function handleSearchClick() {
    navigate(`/products/${search}`);
  }

  useEffect(function () {
    fetchStoreName()
    getAllCategories()
  },
    []);

  return (
    <div className="sticky-top mb-5 bg-white">
      <nav
        class="navbar navbar-expand-md navbar-light bg-white border border-bottom  p-2"
      >
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          <span> DealsfromAmerica</span>
        </Link>
        <button className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#kasim">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="asim">
          <ul className="navbar-nav ms-auto">
            <div id='searchbox'>
              <input type="text" placeholder='Search deals' id='searchinput' onKeyDown={handleSearch} />
              <button className='btn' onClick={handleSearchClick}>
                <i class="fa-solid fa-magnifying-glass text-primary fw-bold"></i>
              </button>
            </div>

            <li class="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <div class="dropdown">
                <button class="nav-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {
                    categoryList.map((item) => (
                      <li><Link className="dropdown-item fs-6 py-2 text-secondary" to={`/category/${item}`}>{item}</Link></li>
                    ))
                  }
                </ul>
              </div>
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
            <li class="nav-item">
              <Link className="nav-link" to="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="offcanvas offcanvas-end" tabindex="-1" id="kasim">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">DealsfromAmerica.com</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <ul className="navbar-nav m-3">
          <div id='searchbox'>
            <input type="text" placeholder='Search deals' id='searchinput' onKeyDown={handleSearch} />
            <button className='btn' onClick={handleSearchClick}>
              <i class="fa-solid fa-magnifying-glass text-primary fw-bold"></i>
            </button>
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
          <li class="nav-item">
            <Link className="nav-link" to="/feedback">Feedback</Link>
          </li>
        </ul>

        <div>
          {
            storeList.map((item) => (
              <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2" to={`/store/${item}`} key={item}>{item}</Link>
            ))
          }
        </div>
        <div>
          {
            categoryList.map((item) => (
              <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2 my-2" to={`/category/${item}`} key={item}>{item} </Link>
            ))
          }
        </div>

      </div>


      <nav className='p-1 shadow-sm px-5 navbar-expand-md'>
        <div className="collapse navbar-collapse" id="asim">
          <div className='hscroll'>
            {
              storeList.map((item) => (
                <div>
                  <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2" to={`/store/${item}`} key={item}>{item}</Link>
                </div>

              ))
            }

            {
              categoryList.map((item) => (
                <div>
                  <Link className="btn btn-outline-primary btn-sm rounded-4 mx-2" to={`/category/${item}`} key={item}>{item}</Link>
                </div>

              ))
            }

          </div>
        </div>
      </nav>



    </div>
  )
}
