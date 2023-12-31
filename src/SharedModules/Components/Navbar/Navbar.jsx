import React from 'react'
import avatar from '../../../assets/imgs/avatar.png'

export default function Navbar({userData}) {
 console.log(userData);
  return (

  <>
  <nav className="navbar navbar-expand-lg navbar-light ">
 
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">
   
      <li className="nav-item ">
      
        <a className="nav-link text-white" href="#">   <img src={avatar} alt="" />{userData?.userName}</a>
      </li>
      
    </ul>
  
  </div>
</nav>
  
  
  </>
  )
}
