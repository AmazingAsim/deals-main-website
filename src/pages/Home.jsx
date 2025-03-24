import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import latest from '../assets/latest.PNG'
import freebes from '../assets/freebes.PNG'
import travel from '../assets/travelbanner.PNG'
import { useBaseUrl } from "../global/baseurlcontext";
import ScrollView from "../components/ScrollView";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const baseUrl = useBaseUrl()
  const fetchUrl = `${baseUrl}/product_api/get-products.php`;

 
  async function getAllCategories() {
    let res = await fetch(`${baseUrl}/product_api/list-category.php`);
    let data = await res.json();
    let List = data.map((item) => item.category);
    setCategoryList(List);
  }

  // Fetch products
  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      let res = await fetch(`${fetchUrl}?&limit=30&page=${newPage}`);
      let newProducts = await res.json();

      if (newPage === 1) {
        setProducts(newProducts); // Reset when storename changes
      } else {
        setProducts((prev) => [...prev, ...newProducts]); // Append for infinite scroll
      }
     
      setHasMore(newProducts.length === 10); // Stop fetching if less than 10 items
      setPage(newPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProducts(1);
    getAllCategories();
  }, []);

  // Infinite Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
        fetchProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);
  return (
    <div className="container-fluid">
      <div id="carouselExampleIndicators" class="carousel slide mb-5"data-bs-ride="carousel" >
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={latest} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={freebes} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={travel} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      {
        categoryList.map((item, index) => (
          <ScrollView key={index} name={item} filter="category" />
        ))
      }
      <ScrollView name="smartphone" filter="name" />

      <h2 className='border border-0 border-bottom border-3 border-primary fw-bold py-2 ms-5' style={{width:'fit-content'}}>Explore More...</h2>

      <div className="container my-5">
        <div className="row">
        {products.map((item, index) => (
          <div className="col-md-6">
            <ProductCard key={index} product={item} />
          </div>
        ))}
        </div>
      </div>
      {loading && <p>Loading more products...</p>}
    </div>
  );
}
