import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from './FirebaseConfig'
import { collection } from 'firebase/firestore'

const ChildrenList = ({path}) => {
    const query=collection(db,path)
  const [docs,loading,error]=useCollectionData(query)
  return (
    <div>
        <ul>
            {
                docs?.map((doc, index)=>{
                return    <li >{doc.name}</li>
                })
            }
        </ul>
    </div>
  )
}

export default ChildrenList