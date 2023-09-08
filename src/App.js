









import './App.css';
import React,{useEffect, useState} from 'react';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import ChildrenList from './Components/ChildrenList'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, db } from './FirebaseConfig';
import AddUser from './Components/AddUser'
import ShowUserData from './Components/ShowUserData'
import { onAuthStateChanged } from 'firebase/auth';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import { useAppContext } from './ContextApi/AppContext';








function App() {
  const [open, setOpen] = useState(false);
  const [CurrentValue, setCurrentValue] = useState('');
  const [DocIdToEdit, setDocIdToEdit] = useState(null);
  const [Currentname, setCurrentname] = useState(null)
  const query = collection(db, 'Os')
  const [docs, loading, error] = useCollectionData(query)
 const {User, setUser} = useAppContext(null)

 console.log(User)
 
  const editDataFunction = (doc) => {
    setOpen(true);
    setCurrentValue(doc.name);
    setDocIdToEdit(doc.id); // Set the document ID of the subcollection item to edit
    setCurrentname(doc.name)
    console.log(DocIdToEdit)
  };
  // const docPath = `Os/New Os/Children/${DocIdToEdit}`;
  
 

  
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
      {User===null? <Auth/>: <Home/>}
     
     
     

     
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
