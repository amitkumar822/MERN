import React from 'react'

const AddToCart = (event,id) => {
  event?.stopPropagation()
  event?.preventDefault()
  alert("ID Received")
    console.log("ID: " + id);
    
    
  return (
    <div>AddTpCard</div>
  )
}

export default AddToCart