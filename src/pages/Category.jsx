import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useBaseUrl } from "../global/baseurlcontext";
import Metadata from "../components/Metadata";
import Footer from "../components/Footer";
import AmazonCatagory from "../components/AmazonCatagory";
export default function Category() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { category } = useParams();
  const baseUrl = useBaseUrl()
  const fetchUrl = `${baseUrl}/product_api/get-products.php`;

  // Fetch products
  async function fetchProducts(newPage = page) {
    if (!hasMore && newPage !== 1) return;

    setLoading(true);
    try {
      let res = await fetch(`${fetchUrl}?category=${category}&limit=15&page=${newPage}`);
      let newProducts = await res.json();
      newProducts = newProducts.filter(item=>{
        return item?.original_price>item.selling_price
      })
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
    }, [category]);
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
    <div className="container my-5">
       <Metadata title="Deals In America" />
       <h3 className="display-6 mb-5">Showing results for {category}</h3>
      <AmazonCatagory catagory={category} />
     
      {loading && <p>Loading more products...</p>}
      <Footer/>
    </div>
  );
}
