import { ArrowDropDownCircleOutlined } from '@mui/icons-material'
import React from 'react'
import SidebarOptions from './SidebarOptions'
import { useAppContext } from '../ContextApi/AppContext'
import { FaUser } from 'react-icons/fa'

function Sidebar() {
    const {User}=useAppContext()
  return (
    <div className='sidebar'>

<SidebarOptions title={User.displayName} src={User.PhotoURL} />
      <SidebarOptions src="https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/iSopISe6V4H.png" title="Covid 19 info center" />
      <SidebarOptions Icon={<FaUser/>} title="Friends" />
      <SidebarOptions src="https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/iSopISe6V4H.png" title="Groups" />
      <SidebarOptions src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/G1ThdFfz_oV.png" title="Mahabeer singh" />
      <SidebarOptions src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/G1ThdFfz_oV.png" title="Watch" />
      <SidebarOptions src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/G1ThdFfz_oV.png" title="Events" />
      <SidebarOptions Icon={<ArrowDropDownCircleOutlined/>}  title="See more" />
      
    </div>
  )
}

export default Sidebar