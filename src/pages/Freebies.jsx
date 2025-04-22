import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useBaseUrl } from "../global/baseurlcontext";
import Metadata from "../components/Metadata";
export default function Freebies() {
  const [products, setProducts] = useState([]);
  const baseUrl = useBaseUrl()
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchUrl = `${baseUrl}/product_api/get-products.php`;

  // Fetch products
  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      let res = await fetch(`${fetchUrl}?&limit=30&price=0.00&page=${newPage}`);
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
        <Metadata title="Deals In America" />
      <div className="container">
      <h2 className=' display-3 border border-0 border-bottom border-3 border-primary mb-5  py-2' style={{width:'fit-content'}}>Free For All</h2>

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
