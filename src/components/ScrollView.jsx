import React, { useEffect } from 'react'
import VerticalCard from './VerticalCard';
import { useBaseUrl } from '../global/baseurlcontext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function ScrollView({name,filter}) {
    const navigate = useNavigate();
    const [pdata, setPdata] = useState([]);
    const baseUrl = useBaseUrl()
    const fetchUrl = `${baseUrl}/product_api/get-products.php`;
    async function getData() {
        let searchUrl = ''
        if(filter==='name'){
            searchUrl = `${fetchUrl}?&limit=4&name=${name}`
        }
        if(filter==='category'){
            searchUrl = `${fetchUrl}?&limit=4&category=${name}`
        }
        try {
         let res = await fetch(searchUrl);
         let data = await res.json();
         setPdata(data);
        } catch (error) {
         console.log(error)
        }
       }
       useEffect(function(){
        getData();
       },[])
  return (
   
        <div className="container-fluid px-5 my-2">
          <h2 className='border border-0 border-bottom border-3 border-primary fw-bold py-2' style={{width:'fit-content'}}>Grab Latest deals on {name}</h2>
          <div className="d-flex justify-content-end p-2">
             {
                pdata.length>=4 && filter==='name' && <button onClick={() => navigate(`/products/${name}`)} className="btn btn-primary" >View All</button>
             }
             {
                pdata.length>=4 && filter==='category' && <button onClick={() => navigate(`/category/${name}`)} className="btn btn-primary" >View All</button>
             }
          </div>
          <div className="row">
           
              {
                pdata.map((item, index) => (
                  <div className="col-md-3">
                    <VerticalCard key={index} product={item} />
                  </div>
                ))
              }
          </div>
        </div>
 
  )
}
