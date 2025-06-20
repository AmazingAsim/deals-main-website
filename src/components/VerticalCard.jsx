import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function VerticalCard({ product }) {
  let navigate = useNavigate();
  let imagBaseUrl = 'https://dealsfromamerica.com/employee/uploads/products';
  // let imagBaseUrl = 'http://localhost/deals_admin/uploads/products/';
  const {
     name, selling_price,original_price,currency, product_link,
    description, image, created_at, store_name,id
  } = product;

  const discount = (((original_price-selling_price)/original_price)*100);
  const formattedDiscount = discount.toFixed(2);
  const dealType = discount>60?'Excellent Deal':discount>30?'Hot Deal':'';
  const [expanded, setExpanded] = useState(false);

  // Limit description to first 100 characters
  const shortDescription = description.length > 100 ? description.slice(0, 100) + "..." : description;
  const timeInEst = new Date(product.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' });

  return (
    <div className="card mb-3 shadow-sm" style={{cursor:'pointer'}} onClick={()=>{navigate(`/product-details/${product.id}`)}}>
           <div className="position-absolute top-0 end-0 text-white px-2 py-1">
               {
                   dealType && <span className={` text-dark badge bg-${discount>60?'success':'warning'}`}>{dealType}</span>
               }
           </div>
          <img 
            src={`${imagBaseUrl}/${image}`} 
            className="img-fluid rounded" 
            alt={image} 
            style={{ maxHeight: "200px", objectFit: "contain", width: "100%" }}
          />
         
      

        {/* Product Details Section */}
          <div className="card-body">
            <h4 className="card-title">{name}</h4>
            {/* Description with View More */}
            <p className="card-text text-muted">
              {expanded ? description : shortDescription}
              {description.length > 100 && (
                <button 
                  className="btn btn-link p-0 ms-2"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "View Less" : "View More"}
                </button>
              )}
            </p>
            <p className='fs-4'><b className='text-success'>-{formattedDiscount}%</b> <i className='ms-3'>{currency==='INR'?'₹':'$'}{selling_price}</i></p>
            <p className='text-muted fs-6'><small>MRP: <s>{currency==='INR'?'₹':'$'}{original_price}</s></small></p>
            <p className="card-text">
              <small className="text-muted">Store: <span className="text-primary">{store_name}</span></small><br />
              <small className="text-muted">Posted At: <span className="text-primary">{timeInEst} EST</span></small>
            </p>
          </div>

          {/* Footer (Share Buttons + Buy Button) */}
          <div className="card-footer d-flex flex-wrap justify-content-between align-items-center">
            
            {/* Social Media Share Links */}
            <div className="d-flex gap-2">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${product_link}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook fs-4 text-primary"></i>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${product_link}&text=${product_link}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-twitter fs-4 text-info"></i>
              </a>
             
<a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
  `Check out this product: ${name}\n` +
  `Sale Price: *${currency==='INR'?'₹':'$'}${selling_price}*\n` +
  `Original Price: *${currency==='INR'?'₹':'$'}${original_price}*\n` +
  `https://dealsfromamerica.com/product-details/${id}`
)}`} target="_blank" rel="noopener noreferrer">
  <i className="fa-brands fa-whatsapp fs-4 text-success"></i>
</a>
              <a href={`https://www.reddit.com/submit?url=${product_link}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-reddit fs-4 text-danger"></i>
              </a>
              <a href={`https://telegram.me/share/url?url=${product_link}`} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-telegram fs-4 text-primary"></i>
              </a>
            </div>
            {/* Buy Now Button */}
            <a href={product_link} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
              Shop Now
            </a>
          </div>
    </div>
  );
}
