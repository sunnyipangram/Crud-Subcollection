import { Icon, IconButton } from '@mui/material'
import { Avatar } from 'antd'
import { FaUser } from 'react-icons/fa';
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FaArrowAltCircleDown } from 'react-icons/fa';

function SidebarOptions(props) {
  return (

    
    <div  className='sidebar-row '>


        {/* <img className='sidebar-icons' src={props.src} /> */}
        {props.src && <Avatar src={props.src}/>}
        {props.Icon && <Icon>
            {props.icon}
            </Icon>}
       
        <p>{props.title}</p>

    </div>
  )
}

export default SidebarOptions