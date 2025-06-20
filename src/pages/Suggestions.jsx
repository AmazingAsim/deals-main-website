import React from 'react'
import Footer from '../components/Footer'
import SuggestionForm from '../components/SuggestionForm'
export default function Suggestions() {
  return (
    <div className='mb-2' style={{overflowY:"hidden",minHeight:"84vh"}}>

    <div className='container'>
      <h2 className='display-4 border border-0 border-bottom border-3 border-primary py-2 mt-5'>You can suggest products here</h2>
      <SuggestionForm/>

    </div>
    <Footer/>
    </div>
  )
}
