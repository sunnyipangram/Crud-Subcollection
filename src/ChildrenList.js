import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from './FirebaseConfig';
import { collection, doc, updateDoc } from 'firebase/firestore';

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

  const query = collection(db, path);
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
  
    // Construct the document reference using the correct path
    const docPath = `${path}/${Currentname}`;
  
    // Use the updateDoc function to update the specific field
    const docRef = doc(db, docPath);
  
    // Define the field you want to update and its new value
    const fieldToUpdate = 'name'; // Replace with the actual field name
    const newValue = CurrentValue; // Replace with the new value you want to set
  
    // Create an object with the field to update
    const updates = {};
    updates[fieldToUpdate] = newValue;
  
    // Use the updateDoc function to update the field
    await updateDoc(docRef, updates);
  
    handleClose();
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
        </Box>
      </Modal>
      {docs?.map((doc, index) => {
        return (
          <td key={doc.id} onClick={() => editDataFunction(doc)}>
            <span style={{ color: 'red' }}>{index + 1}=== </span> {doc.name}
          </td>
        );
      })}
    </>
  );
};

export default ChildrenList;
