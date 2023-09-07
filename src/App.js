









import './App.css';
import React,{useState} from 'react';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import ChildrenList from './Components/ChildrenList'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from './FirebaseConfig';
import AddUser from './Components/AddUser'
import ShowUserData from './Components/ShowUserData'






import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Box, Modal } from '@mui/material';
import AddNew from './Components/AddNew';
import Post from './Post';


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


function App() {
  const [open, setOpen] = useState(false);
  const [CurrentValue, setCurrentValue] = useState('');
  const [DocIdToEdit, setDocIdToEdit] = useState(null);
  const [Currentname, setCurrentname] = useState(null)
  const query = collection(db, 'Os')
  const [docs, loading, error] = useCollectionData(query)
  console.log(docs)

  const editDataFunction = (doc) => {
    setOpen(true);
    setCurrentValue(doc.name);
    setDocIdToEdit(doc.id); // Set the document ID of the subcollection item to edit
    setCurrentname(doc.name)
    console.log(DocIdToEdit)
  };
  // const docPath = `Os/New Os/Children/${DocIdToEdit}`;
  function handleClose(){
    setOpen(false)
  }
  const submitEditedData = async (e) => {
    e.preventDefault();
  

    const docPath = `Os/${DocIdToEdit}`;
  
  
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
    const docPath = `Os/${dock.id}`;
    console.log( `Os/${dock.id}`)
  
    try {
      // Delete the document using deleteDoc function
      await deleteDoc(doc(db, docPath));
     setOpen(false); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };
  
  return (
    <div className="App">
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
      <AddNew/>
     <Post/>
     

     
      {/* <table>
        <tr>
          <th>OS Name</th>
          <th>OS Sub COllection</th>

          <th>Add New</th>


        </tr>
        {loading ?<h1>Loading"</h1> 
          : <>{docs?.map((doc, index) => {
            return (
              <>

                <tr>
                  <td><AiFillDelete style={{ color: 'red' }} onClick={()=>deleteFeildFunction(doc)}/><AiFillEdit onClick={() => editDataFunction(doc)}/>{doc.name}</td>
                  <td >
                    <table>
                      <tr>

                      <ChildrenList
                path={`Os/${doc.name}/Children`}
                parentDocId={doc.id}
                subcollectionName="Children"
              />
                      </tr>
                      </table>
                      
                      </td>
                  <td > <AddNew path={`Os/${doc.name}/Children`} /></td>
                </tr>


               


              </>
            )
          })}</>
        }
      </table> */}
     
      
    </div>
  );
}

export default App;
