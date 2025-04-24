import React from 'react'
import Avatar from './Avatar'
import { useState } from 'react'
export default function FeedbackCard({ item, index }) {
    let shortFeedback = item.feedback.length > 100 ? item.feedback.slice(0, 100) + "..." : item.feedback
    let [extented, setExtended] = useState(false)
    return (
        <div key={index} className="row border p-3 rounded-2" style={{ width: "400px", flexShrink: "0" }} id="feedback_card">
            <div className="col-md-2 d-flex align-items-center justify-content-start flex-column">
                <Avatar name={item.name} />
            </div>
            <div className="col-md-10">
                <h5>@{item.email.split("@")[0]}</h5>
                <p>
                    {extented ? item.feedback : shortFeedback}
                     {item.feedback.length > 100 &&  
                     <button className="btn btn-link" onClick={() => setExtended(!extented)}>
                        {extented ? "Show Less" : "Show More"}
                    </button>}
                </p>
                <small>{new Date(item.created_at).toDateString()}</small>
            </div>
        </div>
    )
}
