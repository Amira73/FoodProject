import React from 'react'
import profile from '../../../assets/images/profile.png'

export default function NavBar({toggleSidebar}) {
  return (
  <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
       <img
  src={profile}
  alt="profile"
  className="rounded-circle"
  style={{ width: 48, height: 48, objectFit: "cover" }}
/>
        </li>
        <li className="nav-item">
          <h4>Ameera</h4>
        </li>
   
      
      </ul>
    
    </div>
  </div>
</nav>
  </>
  )
}
