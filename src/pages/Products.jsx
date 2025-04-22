import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useBaseUrl } from "../global/baseurlcontext";
import Metadata from "../components/Metadata";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { productname } = useParams();
  const baseUrl = useBaseUrl()
  const fetchUrl = `${baseUrl}/product_api/get-products.php`;

  // Fetch products
  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      let res = await fetch(`${fetchUrl}?name=${productname}&limit=30&page=${newPage}`);
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

  // Fetch new data when storename changes
  useEffect(() => {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      fetchProducts(1);
    }, [productname]);
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
    <div className="container">
         <Metadata title="Deals In America" />
       <h3 className="display-6">Showing results for {productname}</h3>
      {
        products.length > 0 ?  
        
        <div className="row">
        {products.map((item, index) => (
          <div className="col-md-6">
            <ProductCard key={index} product={item} />
          </div>
        ))}
        </div>
            
        : <div className="container text-danger">
             <h2 className="display-3 text-center p-3">Result Not Found</h2>
        </div>
        
      }
      {loading && <p>Loading more products...</p>}
    </div>
  );
}
