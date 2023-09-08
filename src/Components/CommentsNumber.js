import React from 'react'
import { db } from '../FirebaseConfig'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const CommentsNumber = ({id}) => {
    const query = collection(db, `Posts/${id}/Comments`);
  
  const [docs, loading, error] = useCollectionData(query);
  // console.log(docs, 'comments');
  //   console.log(docs,'commentscount')
  return (
    <span>{docs?.length}</span>
  )
}

export default CommentsNumber