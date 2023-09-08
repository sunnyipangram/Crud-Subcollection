import React from 'react'
import { useAppContext } from '../ContextApi/AppContext'

const Navbar = () => {
    const {User,handleLogout}=useAppContext()

console.log(User.photoURL)

  return (
 
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  {/* Container wrapper */}
  <div className="container-fluid">
    {/* Toggle button */}
    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars" />
    </button>
    {/* Collapsible wrapper */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* Navbar brand */}
      <a className="navbar-brand mt-2 mt-lg-0" href="#">
        {/* <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height={15} alt="MDB Logo" loading="lazy" /> */}
      </a>
      {/* Left links */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>Log Out</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >{User.displayName}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Add Post</a>
        </li>
      </ul>
      {/* Left links */}
    </div>
    {/* Collapsible wrapper */}
    {/* Right elements */}
    <div className="d-flex align-items-center">
      {/* Icon */}
      <a className="text-reset me-3" href="#">
        <i className="fas fa-shopping-cart" />
      </a>
      {/* Notifications */}
     
      {/* Avatar */}
      <div className="dropdown">
        <a className=" d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
          <img src={User.photoURL} className="rounded-circle" height={25} alt="Black and White Portrait of a Man" loading="lazy" />
        </a>
       
      </div>
    </div>
    {/* Right elements */}
  </div>
  {/* Container wrapper */}
</nav>


  )
}

export default Navbar