import React, { useState } from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../FirebaseConfig';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const ChildrenList = ({ parentDocId, subcollectionName, path }) => {
  const [open, setOpen] = React.useState(false);
  const [CurrentValue, setCurrentValue] = useState('');
  const [DocIdToEdit, setDocIdToEdit] = useState(null);
  const [Currentname, setCurrentname] = useState(null)
  

  const handleClose = () => setOpen(false);

  const query = collection(db, 'Posts/Post/Children');
  const [docs, loading, error] = useCollectionData(query);

  const editDataFunction = (doc) => {
    setOpen(true);
    setCurrentValue(doc.name);
    setDocIdToEdit(doc.id); // Set the document ID of the subcollection item to edit
    setCurrentname(doc.name)
    console.log(DocIdToEdit)
  };
  // const docPath = `Os/New Os/Children/${DocIdToEdit}`;

  const submitEditedData = async (e) => {
    e.preventDefault();
  

    const docPath = `${path}/${DocIdToEdit}`;
  
  
    const docRef = doc(db, docPath);
  
    
    const fieldToUpdate = 'name';
    const newValue = CurrentValue; 
  
   
    const updates = {};
    updates[fieldToUpdate] = newValue;
  
    // Use the updateDoc function to update the field
    await updateDoc(docRef, updates);
  
    handleClose();
  };

  
  const deleteFeildFunction = async (dock) => {
    // Construct the document reference using the correct path
    const docPath = `${path}/${dock.id}`;
    console.log( `${path}/${dock.id}`)
  
    try {
      // Delete the document using deleteDoc function
      await deleteDoc(doc(db, docPath));
      handleClose(); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };


  return (
    <>
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="" onSubmit={submitEditedData}>
            <input
              type="text"
              value={CurrentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <button>delete</button>
        </Box>
      </Modal>
     

      {/* {docs?.map((doc, index) => {
        return (
          <td key={doc.id} >
            <span style={{display:'flex',alignItems:'center',gap:'8px'}} ><AiFillDelete style={{ color: 'red' }} onClick={()=>deleteFeildFunction(doc)}/><AiFillEdit onClick={() => editDataFunction(doc)}/> {doc.name}</span> 
          </td>
        );
      })} */}
    
 </>
  );
};

export default ChildrenList;
