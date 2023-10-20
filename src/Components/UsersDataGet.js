import React from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../FirebaseConfig'
import { collection, doc } from 'firebase/firestore'
import { useAppContext } from '../ContextApi/AppContext'

const UsersDataGet = () => {
    const {User}=useAppContext()
    // console.log(User)

    const query=doc(db,'Users',User.uid)
    const [users,loading,error]=useDocumentData(query)


  return (
    <div>UsersDataGet</div>
  )
}

export default UsersDataGet