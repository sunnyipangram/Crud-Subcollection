import { collection } from 'firebase/firestore'
import React from 'react'
import { db } from '../FirebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const ReplyComponent = ({commentid,postid}) => {
    console.log(commentid,postid)
    const query=collection(db,`/Posts/${postid}/Comments/${commentid}/replies`)
    const [Replies,error,loading]=useCollectionData(query)
    console.log(Replies)


  return (
    <>

    {Replies?.map((comment) => (
        <div className="comment" key={comment.id}>
          <img
            src={comment.userProfile}
            style={{width:'25px',height:'25px'}}
            className="rounded-image"
            alt="User"
          />
          <div className="comment-content">
            <span className="name">{comment.userName}</span>
            
              <p className="comment-text">{comment.comment}</p>
            
                

              <div className="replying-comments">
                
              </div>
            </div>
           
          </div>
         
       
      ))}
</>
  )
}

export default ReplyComponent