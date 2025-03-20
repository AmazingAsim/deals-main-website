import React from 'react'

export default function ProductCard(props) {
    let {
      id,
      name,
      price,
      category,
      sub_category,
      product_link,
      description,
      image,
      created_at,
      store_name
    } = props.product;
  return (
    <div>
       <div className="card mb-3">
  <div className="row g-0">
    <div className="col-md-4 text-center">
      <img src={`http://localhost/deals_admin/uploads/products/${image}`} className="img-fluid rounded-start" alt="..."/>
       <h2>${price}</h2>

    </div>
    <div className="col-md-8 d-flex flex-column">
      <div className="card-body flex-1">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small class="text-body-secondary me-5">Store: <span className='text-primary'>{store_name}</span></small>
          <small class="text-body-secondary">Posted At <span className='text-primary'>{created_at}</span></small>
        </p>
      </div>
      <div className="card-footer text-end">
      <p>Price: ${price}</p>
      <a href={product_link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Shop Now</a> 
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
