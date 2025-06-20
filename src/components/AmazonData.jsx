import React from 'react'
import usetransformAmazonData from "../hooks/useTransform";
import AmazonCard from "../components/AmazonCard";
import { useState,useEffect } from 'react';
import { useBaseUrl } from '../global/baseurlcontext';
export default function AmazonData(props) {
    const baseUrl = useBaseUrl()
    const amazonurl = `${baseUrl}/product_api/amazon.php`;
     const [sortedData,setSortedData] = useState(true);
     const [amazonData,setAmazonData] = useState([]);
      const randomKeywords = ["electronics","Fashion","Beauty","Health","Toys","Sports","Books","Games","phones","laptops"];
    const [SerachUrl,setSearchUrl] = useState(``);
      async function getDataFromAmazon(keyword) {
    try {
      let result = await fetch(`${amazonurl}?keyword=${keyword}`,{method:"GET",mode:"cors"});
      let data = await result.json();
      if(data) setSearchUrl(data.SearchResult.SearchURL);
      let sortedData = usetransformAmazonData(data);
      if(sortedData.length===0) setSortedData(false);
      console.log(sortedData);
      setAmazonData(sortedData);
    } catch (error) {
      console.log(error);
    }
  }


  // fetch data from amazon
  useEffect(()=>{
    let searchKeyWord = props.keyword ? props.keyword : randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    getDataFromAmazon(searchKeyWord);
  },[props.keyword])
  return (
    <div>
          {
              amazonData.length>0 ? (
                <div className="container-fluid my-5">
                     <div className="d-flex justify-content-between align-items-center">
                  <h2 className='border border-0 border-bottom border-3 border-primary fw-bold py-2 ms-5' style={{width:'fit-content'}}>Explore Amazon Deals...</h2>
                    <a href={SerachUrl} target="_blank" className="btn btn-primary" rel="noreferrer">View More</a>
                  </div>
                  <div className="row">
                  {amazonData.map((item, index) => (
                    <div className=" col-12 col-sm-6 col-md-3" key={index}>
                      <AmazonCard key={index} product={item} />
                    </div>
                  ))}
                  </div>
                </div>
              ):
              sortedData?<div className="container-fluid my-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>:
              null
            }
    </div>
  )
}
