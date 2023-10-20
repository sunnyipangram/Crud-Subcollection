import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAppContext } from '../ContextApi/AppContext'

const ReplyComponent = ({commentid,postid}) => {
    // console.log(commentid,postid)
    const query=collection(db,`/Posts/${postid}/Comments/${commentid}/replies`)
    const [Replies,error,loading]=useCollectionData(query)
    // console.log(Replies)
    const [ReplyUsers, setReplyUsers] = useState({})
    const {UserProfile}=useAppContext()


    useEffect(() => {
      if (Replies) {
        // Fetch user data for each post concurrently
        const fetchUserDataForComment = async (comment) => {
          try {
            const userDoc = await getDoc(doc(db, 'Users', comment.userId));
            if (userDoc.exists()) {
              return userDoc.data();
            } else {
              console.error('User document does not exist');
              return {}; // Return an empty object as a default value
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            return {}; // Return an empty object as a default value
          }
        };
    
        Promise.all(Replies.map(fetchUserDataForComment))
          .then((userDataArray) => {
            // Create a map of user data with user IDs as keys
            const commentUsersMap = userDataArray.reduce((acc, userData, index) => {
              acc[Replies[index].userId] = userData;
              return acc;
            }, {});
    
            // Check if commentUsersMap is different from the current state before updating
            const isDifferent = Object.keys(commentUsersMap).some(
              (userId) => commentUsersMap[userId] !== ReplyUsers[userId]
            );
    
            if (isDifferent) {
              setReplyUsers(commentUsersMap);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data for comments:', error);
          });
      }
    }, [Replies,UserProfile]);
    


  return (
    <>

    {Replies?.map((comment) => {
      // console.log(comment,'reply')
      
      const ReplyUser = ReplyUsers[comment.userId] || {}; // Get user data from the map
     
   
      return(
        <div className="comment" key={comment.id}>
          <img
            src={ReplyUser.profileImage}
            style={{width:'25px',height:'25px'}}
            className="rounded-image"
            alt="User"
          />
          <div className="comment-content">
            <span className="name">{ReplyUser.firstName} {ReplyUser.lastName}</span>
            
              <p className="comment-text">{comment.comment}</p>
            
                

              <div className="replying-comments">
                
              </div>
            </div>
           
          </div>
         
       
      )})}
</>
  )
}

export default ReplyComponent