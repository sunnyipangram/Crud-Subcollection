import { Box, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddNew from '../Components/AddNew'
import Post from '../Post'
import { collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAppContext } from '../ContextApi/AppContext';
import Navbar from '../Components/Navbar';
import UsersDataGet from '../Components/UsersDataGet';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Home = () => {

    
    const [CurrentValue, setCurrentValue] = useState('');
    const [DocIdToEdit, setDocIdToEdit] = useState(null);
    const [Currentname, setCurrentname] = useState(null)
    const query = collection(db, 'Os')
    const [docs, loading, error] = useCollectionData(query)
    const {setUser,handleLogout,open,setOpen}=useAppContext()
    function handleClose() {
        setOpen(false)
    }
    function handleOpen() {
        setOpen(true)
    }

    
   
    
  
      
    return (
        <>
        
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNew path={'Posts'} />
      </Modal>
    
            <Navbar/>
            <UsersDataGet/>
            
            <Post />
        </>
    )
}

export default Home