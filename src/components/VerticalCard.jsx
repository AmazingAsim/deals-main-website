import React, { useState } from 'react';

export default function VerticalCard({ product }) {
  const {
    id, name, price, category, sub_category, product_link,
    description, image, created_at, store_name
  } = product;

  const [expanded, setExpanded] = useState(false);

  // Limit description to first 100 characters
  const shortDescription = description.length > 100 ? description.slice(0, 100) + "..." : description;

  return (
    <div className="card mb-3 shadow-sm">
       
          <img 
            src={`http://localhost/deals_admin/uploads/products/${image}`} 
            className="img-fluid rounded" 
            alt={name} 
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
            <p><b>Price: </b><i>${price}</i></p>
            <p className="card-text">
              <small className="text-muted">Store: <span className="text-primary">{store_name}</span></small><br />
              <small className="text-muted">Posted At: <span className="text-primary">{created_at}</span></small>
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
              <a href={`https://api.whatsapp.com/send?text=${product_link}`} target="_blank" rel="noopener noreferrer">
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
