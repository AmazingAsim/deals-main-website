import React from 'react'

import FeedbackList from '../components/FeedbackList'
import { useNavigate } from 'react-router-dom'
export default function Feedback() {
  const navigate = useNavigate()
  return (
    <div>
        <div className="d-flex justify-content-end px-5">
           <button className='btn btn-primary' onClick={()=>{navigate('/send_feedback')}} >Send us a feedback</button>
        </div>
        <div className="container" id='feedbacklist'>
          <h1 className=' display-6 border border-0 border-bottom border-3 border-primary mb-5  py-2'>
                See what our customers have to say
            </h1>
            <FeedbackList/>
       
        </div>

    </div>
  )
}
