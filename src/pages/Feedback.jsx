import React from 'react'

import FeedbackList from '../components/FeedbackList'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
export default function Feedback() {
  const navigate = useNavigate()
  return (
    <div className=''>
        <div className="container" id='feedbacklist' style={{minHeight:"63vh"}}>
          <h1 className=' display-6 border border-0 border-bottom border-3 border-primary mb-5  py-4'>
                See what our customers have to say
            </h1>
           <button id='send_feedback_btn' className='btn btn-primary' onClick={()=>{navigate('/send_feedback')}} >Send us a feedback</button>

            <FeedbackList/>
       
        </div>

<div className='mt-5'>
<Footer/>
</div>
    </div>
  )
}
