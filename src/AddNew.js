import { doc, setDoc } from 'firebase/firestore';
import React, { useRef } from 'react'
import { db } from './FirebaseConfig';

const AddNew = ({path}) => {
const name=useRef()

    const handleSubmitTask=async(e) => {
e.preventDefault();

//API call
const docRef=doc(db,path,name.current.value)
await setDoc(docRef,{
    name:name.current.value
})
e.target.reset()
    }

  return (
   <li>
    <form action="" onSubmit={handleSubmitTask}>
        <input type="text" ref={name} />
        <button type='Submit'>Add</button>
    </form>
   </li>
  )
}

export default AddNew