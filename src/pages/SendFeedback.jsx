import React from 'react'
import FeedbackForm from '../components/FeedbackForm'
export default function SendFeedback() {
  return (
    <div className='bg-dark text-white p-5'>
        <div className="container">
            <h4 className=' display-6 border border-0 border-bottom border-3 border-primary mb-5  py-2'>Send us a feedback</h4>
            <div className="w-75 mx-auto">
                 <FeedbackForm/>
            </div>
        </div>
    </div>
  )
}
