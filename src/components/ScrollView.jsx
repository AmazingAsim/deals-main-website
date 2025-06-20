import React, { useEffect } from 'react'
import { useBaseUrl } from '../global/baseurlcontext';
import { useState } from 'react';
import AmazonCard from './AmazonCard';
export default function ScrollView({name,filter}) {
    const [amazonData, setAmazonData] = useState([]);
    const baseUrl = useBaseUrl()
    const amazonFetchUrl = `${baseUrl}/product_api/amazon/fetch_products.php`;
    async function getAmazonData() {
        let searchUrl = ''
        if(filter==='name'){
            searchUrl = `${amazonFetchUrl}?&limit=10&name=${name}`
        }
        if(filter==='category'){
            searchUrl = `${amazonFetchUrl}?&limit=10&category=${name}`
        }
        try {
         let res = await fetch(searchUrl);
         let data = await res.json();
         setAmazonData(data);
        } catch (error) {
         console.log(error)
        }
       }
       useEffect(function(){
     
        getAmazonData();
       },[name,filter])
  return (
   
        <div className="container-fluid px-5 my-2">
          <h2 className='border border-0 border-bottom border-3 border-primary fw-bold py-2' style={{width:'fit-content'}}>Grab Latest deals on {name}</h2>
          <div className="row">

            {
              amazonData.map((item, index) => (
                <div className="col-md-3">
                  <AmazonCard key={index} product={item} />
                </div>
              ))
            }
          </div>
        </div>
 
  )
}
