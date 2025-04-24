import React from 'react'

export default function Avatar({name}) {
    let randomcolor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div className="rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px",backgroundColor: `#${randomcolor}` }}>
    {name[0].toUpperCase()}
</div>
  )
}
