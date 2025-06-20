import React, { useEffect, useState } from "react";
import { useBaseUrl } from "../global/baseurlcontext";
import Metadata from "../components/Metadata";
import AmazonCard from "./AmazonCard";
export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = useBaseUrl()
  const fetchUrl = `${baseUrl}/product_api/amazon/fetch_products.php?limit=20&page=${page}`;

  // fetch data from amazon

  // Fetch products
  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;
    setLoading(true);
    try {
      let res = await fetch(`${fetchUrl}?&limit=50&page=${newPage}`,{method:"GET",mode:"cors"});
      let newProducts = await res.json();
      // console.log(newProducts);
      newProducts = newProducts.filter(item=>{
        return item?.original_price>item.selling_price
      })
      console.log(newProducts);

      if (newPage === 1) {
        setProducts(newProducts); // Reset when storename changes
      } else {
        setProducts((prev) => [...prev, ...newProducts]); // Append for infinite scroll
      }
     
      setHasMore(newProducts.length >= 1); // Stop fetching if less than 10 items
      setPage(newPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Infinite Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && hasMore && !loading) {
        console.log("scroll");
        fetchProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);
  return (
    <div className="container-fluid mt-3">
      <Metadata title="Deals In America" />
      <h2 className='border border-0 border-bottom border-3 border-primary fw-bold py-2 ms-5' style={{width:'fit-content'}}>Top Deals On Amazon</h2>
      <div className="container-fluid my-5">
        <div className="row">
        {products.map((item, index) => (
          <div className=" col-12 col-sm-6 col-md-3" key={index}>
            <AmazonCard key={index} product={item} />
          </div>
        ))}
        </div>
      </div>
      {loading && <p>Loading more products...</p>}
    </div>
  );
}
