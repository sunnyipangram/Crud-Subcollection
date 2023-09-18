import { doc, setDoc } from 'firebase/firestore';
import React, { useRef } from 'react'
import { db } from '../FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { FaComment } from 'react-icons/fa';
import { useAppContext } from '../ContextApi/AppContext';


const AddComment = ({id}) => {
const newComment=useRef()
const {User}=useAppContext()



const handleSubmitTask = async (e) => {
    e.preventDefault();

    // Get the value from the ref
    const commentText = newComment.current.value;

    // Check if the comment is not empty
    if (!commentText) {
      return;
    }

    // Generate a unique ID for the comment
    const uniqueId = uuidv4();
    const docRef = doc(db, `Posts/${id}/Comments`, uniqueId);

    // Use the value, not the ref object
    await setDoc(docRef, {
      comment: commentText, // Use the extracted commentText
      id: uniqueId,
      userName:User.displayName,
        userProfile:User.photoURL,
        userId:User.uid
    });

    // Clear the input field
    newComment.current.value = '';
  }

  return (
  
    <form action="" onSubmit={handleSubmitTask} className='add-comment-form'>
        
        <input type="text" placeholder='Add Comment...' className='add-comment-input' ref={newComment} />
        <button type='Submit' className='add-comment-btn'><FaComment/></button>
        
    </form>
  
  )
}

export default AddComment