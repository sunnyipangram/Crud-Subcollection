import React from 'react'
import EditProfileComponent from '../Components/EditProfileComponent'
import Navbar from '../Components/Navbar'
import { useAppContext } from '../ContextApi/AppContext'
import { Modal } from 'antd'
import AddNew from '../Components/AddNew'

const EditProfile = () => {
  const {setUser,handleLogout,open,setOpen}=useAppContext()
  function handleClose() {
      setOpen(false)
  }
  function handleOpen() {
      setOpen(true)
  }
  return (<>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNew path={'Posts'} />
      </Modal>
  <Navbar/>
    <EditProfileComponent/>
    </>
  )
}

export default EditProfile