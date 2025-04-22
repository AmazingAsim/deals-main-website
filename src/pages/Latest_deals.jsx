

import { useEffect } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import ProductCard from "../components/ProductCard";
import Metadata from "../components/Metadata";
export default function LatestDeals() {
  const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);

const startDate = sevenDaysAgo.toISOString().split("T")[0]; // 7 days ago (YYYY-MM-DD)
const endDate = today.toISOString().split("T")[0]; // Today (YYYY-MM-DD)
console.log(endDate,startDate);
const category=''
  const { products, fetchProducts, loading, hasMore } = useInfiniteScroll(category,startDate,endDate);
  // Detect scroll and load more products
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
        fetchProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore,fetchProducts]);

 

  return (
    <div>
      <div className="container">
          <Metadata title="Deals In America" />
        <h2 className=' display-3 border border-0 border-bottom border-3 border-primary mb-5  py-2' style={{width:'fit-content'}}>Latest Deals</h2>
         <div className="row">
         {products.map((product) => (
           <div className="col-md-6">
                <ProductCard key={product.id} product={product} />
           </div>
        ))}
         </div>
      </div>
      {loading && <p>Loading more products...</p>}
    </div>
  );
}


