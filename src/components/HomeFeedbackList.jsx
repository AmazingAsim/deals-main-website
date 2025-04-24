import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBaseUrl } from "../global/baseurlcontext";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
function FeedbackList() {
    let navigate = useNavigate()
    // const dummyFeedbacks = [
    //     {
    //         name: "John Doe",
    //         email: "H0l5M@example.com",
    //         feedback: "Great website! I found what I was looking for.",
    //         created_at: "2023-06-01"
    //     },
    //     {
    //         name: "Jane Smith",
    //         email: "0l2eM@example.com",
    //         feedback: "The website is user-friendly and easy to navigate.",
    //         created_at: "2023-06-02"
    //     },
    //     {
    //         name: "Bob Johnson",
    //         email: "Y2VtM@example.com",
    //         feedback: "The products are of high quality and meet my needs.",
    //         created_at: "2023-06-03"
    //     },
    //     {
    //         name: "Alice Williams",
    //         email: "Z6Y3M@example.com",
    //         feedback: "The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.The customer service was excellent and responsive. and easy to navigate.",
    //         created_at: "2023-06-04"
    //     },
    //     {
    //         name: "Charlie Brown",
    //         email: "Z6Y3M@example.com",
    //         feedback: "The website is user-friendly and easy to navigate.",
    //         created_at: "2023-06-04"
    //     },
    //     {
    //         name: "Charlie Brown",
    //         email: "Z6Y3M@example.com",
    //         feedback: "The website is user-friendly and easy to navigate.",
    //         created_at: "2023-06-04"
    //     },
    //     {
    //         name: "Charlie Brown",
    //         email: "Z6Y3M@example.com",
    //         feedback: "The website is user-friendly and easy to navigate.",
    //         created_at: "2023-06-04"
    //     }
    // ]
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
        <div onClick={() => { navigate('/feedback') }} style={{ cursor: "pointer" }}>
            <div className="mt-5 container" id="feedback_list_home" >
                {loading ? (
                    <p>Loading...</p>
                ) : feedbacks.length === 0 ? (
                    <p>No feedback available.</p>
                ) : (
                    feedbacks.map((item, index) => (
                        <div key={index} className="row border p-3 rounded-2" style={{ width: "400px", flexShrink: "0" }} id="feedback_card">
                            <div className="col-md-2 d-flex align-items-center justify-content-center flex-column">
                                <Avatar name={item.name} />
                            </div>
                            <div className="col-md-10">
                                <h5>@{item.email.split("@")[0]}</h5>
                                <p>{item.feedback.slice(0, 100)}</p>
                                <small>{new Date(item.created_at).toDateString()}</small>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FeedbackList;
