import React from 'react'
import header from '../../../assets/images/header.png'

export default function Header({title,description,imgUrl}) {
  return (
  <>
<header className="bg-header overflow-hidden">
  <div className="container-fluid px-0">
    <div className="row align-items-center p-3 text-white">
      
      <div className="col-12 col-md-8">
        <h1>{title}</h1> 
        <p>{description}</p>
      </div>

      <div className="col-12 col-md-4 text-end">
      <img className="img-fluid w-75" src={imgUrl} alt='header' />
      </div>

    </div>
  </div>
</header>
  </>
  )
}
