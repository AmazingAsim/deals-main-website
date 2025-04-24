import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBaseUrl } from "../global/baseurlcontext";
import Avatar from "./Avatar";
import FeedbackCard from "./FeedbackCard";
function FeedbackList() {
  
  const dummyFeedbacks = [
    {
      name: "John Doe",
      email: "H0l5M@example.com",
      feedback: `Great website! I found what I was looking for.
      Great website! I found what I was looking for
      Great website! I found what I was looking for
      Great website! I found what I was looking for
      Great website! I found what I was looking for
      Great website! I found what I was looking for
      Great website! I found what I was looking for
      Great website! I found what I was looking for
      `,
      created_at: "2023-06-01"
    },
    {
      name: "Jane Smith",
      email: "0l2eM@example.com",
      feedback: "The website is user-friendly and easy to navigate.",
      created_at: "2023-06-02"
    },
    {
      name: "Bob Johnson",
      email: "Y2VtM@example.com",
      feedback: "The products are of high quality and meet my needs.",
      created_at: "2023-06-03"
    },
    {
      name: "Alice Williams",
      email: "Z6Y3M@example.com",
      feedback: "The customer service was excellent and responsive.",
      created_at: "2023-06-04"
    },
    {
      name: "Charlie Brown",
      email: "Z6Y3M@example.com",
      feedback: "The website is user-friendly and easy to navigate.",
      created_at: "2023-06-04"
    },
    {
      name: "Charlie Brown",
      email: "Z6Y3M@example.com",
      feedback: "The website is user-friendly and easy to navigate.",
      created_at: "2023-06-04"
    },
    {
      name: "Charlie Brown",
      email: "Z6Y3M@example.com",
      feedback: "The website is user-friendly and easy to navigate.",
      created_at: "2023-06-04"
    }
  ]
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = useBaseUrl()
  const fetchUrl = `${baseUrl}/product_api/get_feedbacks.php`;
  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap" style={{justifyContent:"space-around",columnGap:"20px",rowGap:"20px"}} >
      {loading ? (
        <p>Loading...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        feedbacks.map((item, index) => (
         <FeedbackCard item={item} index={index} />
        ))
      )}
    </div>
  );
}

export default FeedbackList;
