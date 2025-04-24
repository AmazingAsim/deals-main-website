import { useState, useEffect } from "react";
import { useBaseUrl } from "../global/baseurlcontext";

const useInfiniteScroll = (category = "",startDate = "",endDate = "") => {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const baseUrl = useBaseUrl();
  // const baseUrl = ``
  const fetchProducts = async () => {
    if (!hasMore) return;
    console.log(category,startDate,endDate);
    setLoading(true);
    try {
      const fetchQuery = `${baseUrl}/product_api/get-products.php?limit=10&page=${page}&category=${category}&start_date=${startDate}&end_date=${endDate}`
      console.log(fetchQuery);
      const res = await fetch(fetchQuery);
      const newProducts = await res.json();
      console.log(newProducts);
      if (newProducts.length < 1) setHasMore(false); // No more products
      setProducts((prev) => [...prev, ...newProducts]); // Append new products
      setPage((prev) => prev + 1);
    } 
    catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchProducts();
  }, []); // Fetch on mount


  return { products, fetchProducts, loading, hasMore };
};

export default useInfiniteScroll;
