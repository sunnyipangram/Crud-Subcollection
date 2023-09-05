import { doc, setDoc } from 'firebase/firestore';
import React, { useRef } from 'react'
import { db } from './FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';


const AddNew = ({path}) => {
const name=useRef()

    const handleSubmitTask=async(e) => {
e.preventDefault();

//API call
const docRef=doc(db,path,name.current.value)
const uniqueId = uuidv4(); // Generate a unique string ID
await setDoc(docRef,{
    name:name.current.value,
    id:uniqueId
})
e.target.reset()
    }

  return (
  
    <form action="" onSubmit={handleSubmitTask}>
        <input type="text" ref={name} />
        <button type='Submit'>Add</button>
        
    </form>
  
  )
}

export default AddNew