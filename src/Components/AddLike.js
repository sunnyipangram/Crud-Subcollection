import { collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../FirebaseConfig'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import { AiFillLike } from 'react-icons/ai'

const AddLike = ({id}) => {

   
      

const query=collection(db,`Posts/${id}/Likes`)
const [likes,loading,error]=useCollectionData()

  return (
    <span className="Like-count" > <AiFillLike/> </span>
  )
}

export default AddLike