import React from 'react'
import { useAppContext } from '../ContextApi/AppContext'
import '../Css/Navbar.css'
import {  FaFacebookMessenger, FaHome, FaSearch,  FaUserEdit, } from 'react-icons/fa'
import {  AiFillNotification, AiOutlineLogout, AiOutlinePauseCircle} from 'react-icons/ai'
import { Avatar } from 'antd'
import { NavLink,Link } from 'react-router-dom'
import { MdOndemandVideo } from "react-icons/md";



const Navbar = () => {
    const {User,handleLogout,setOpen,UserProfile}=useAppContext()

// console.log(User)

  return (
 
    <div className='header'>
    <div className="header_left">
        <img style={{height:"50px"}} src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png" alt="" />

        <div className="header-search">

        <FaSearch style={{position:"absolute", left:"10px", top:'10px'}} onClick />
            
            <input type="text"  style={{
borderRadius: "50px",
padding: "10px 35px",
border:" 1px solid grey",
width:" 100%",
}}  placeholder='search facebook'/>
           
            
        </div>

    </div>
    <div className="header-middle">
      <NavLink to={'/'}>
      <div className="header-option  header__option--active">
     <FaHome  fontSize='large'/>
     </div>
     </NavLink>
     <NavLink to={'/editprofile'}>
    < div className="header-option">
     <FaUserEdit  fontSize='large'/>
     </div>
     </NavLink>
     < div className="header-option" >
     <AiOutlinePauseCircle fontSize='large' />
     </div>
     <NavLink to={'/videofeed'}>
     < div className="header-option">
     <MdOndemandVideo  fontSize='large'/>
     </div>
     </NavLink>


     

    </div>
    <div className="header-right">
      <div className="header-info">


        <h5>{UserProfile?.firstName}'s Facebook</h5>

        
      </div>
      <div className='sidemenu'>
        <NavLink to='/profile'>
      <Avatar src={UserProfile?.profileImage}/>
      </NavLink>
      </div>
      <div className='sidemenu'>
        <AiFillNotification />
        </div>
      <div className='sidemenu'>
        <FaFacebookMessenger />
        </div>
      <div className='sidemenu' onClick={handleLogout} style={{color:'red',fontSize:'25px'}}>
        <AiOutlineLogout />
        </div>
        
    </div>

</div>


  )
}

export default Navbar