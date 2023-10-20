import React, { useEffect, useState } from 'react';
import { db } from '../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, updateDoc, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import {  FaReply, FaEdit } from 'react-icons/fa';
import '../Comment.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAppContext } from '../ContextApi/AppContext';
import ReplyComponent from './ReplyComponents';

const Comments = ({ postid }) => {
  const query = collection(db, `Posts/${postid}/Comments`);
  const [docs, loading, error] = useCollectionData(query);
  const { User } = useAppContext();
  const [CommentUsers, setCommentUsers] = useState({});

  // State to track editing state
  const [editingComment, setEditingComment] = useState(null);
  const [newComment, setNewComment] = useState('');

  // State to track whether the reply modal is open
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const {UserProfile}=useAppContext()

  // Function to handle editing a comment
  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.comment);
  };

  // Function to handle saving edited comment
  const handleSaveEdit = async () => {
    if (!editingComment) return;

    const commentDocRef = doc(db, `Posts/${postid}/Comments`, editingComment.id);
    await updateDoc(commentDocRef, {
      comment: newComment,
    });

    // Clear editing state
    setEditingComment(null);
    setNewComment('');
  };

  // Function to handle canceling edit
  const handleCancelEdit = () => {
    setEditingComment(null);
    setNewComment('');
  };

  // Function to handle deleting a comment
  const handleDeleteComment = async (comment) => {
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
    if (confirmation) {
      const commentDocRef = doc(db, `Posts/${postid}/Comments`, comment.id);
      await deleteDoc(commentDocRef);
    }
  };

  // Function to handle opening the reply modal
  const handleOpenReplyModal = (comment) => {
    setReplyingTo(comment);
    setReplyText('');
  };

  // Function to handle submitting a reply
  const handleSubmitReply = async () => {
    if (!replyingTo || !replyText) return;

    const replyDocRef = collection(db, `Posts/${postid}/Comments/${replyingTo.id}/replies`);

    // Create a new reply document
    await addDoc(replyDocRef, {
      comment: replyText,
      userName: User.displayName,
      userProfile: User.photoURL,
      userId: User.uid,
      timestamp: new Date(),
    });

    // Close the reply modal
    setReplyingTo(null);
    setReplyText('');
  };


  useEffect(() => {
    if (docs) {
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

      Promise.all(docs.map(fetchUserDataForComment))
        .then((userDataArray) => {
          // Create a map of user data with user IDs as keys
          const commentUsersMap = userDataArray.reduce((acc, userData, index) => {
            acc[docs[index].userId] = userData;
            return acc;
          }, {});
          setCommentUsers(commentUsersMap);
        })
        .catch((error) => {
          console.error('Error fetching user data for comments:', error);
        });
    }
  }, [docs,UserProfile]);

  return (
    <div className="comments">
      {docs?.map((comment) => {
       
       const  CommentUser = CommentUsers[comment.userId] || {}; // Get user data from the map
      
        return (
          <div className="comment" key={comment.id}>
            <img
              src={CommentUser.profileImage}
              width={40}
              className="rounded-image"
              alt="User"
            />
            <div className="comment-content">
              <span className="name">{CommentUser.firstName} {CommentUser.lastName}</span>
              {editingComment === comment ? (
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              ) : (
                <p className="comment-text">{comment.comment}</p>
              )}
              <div className="comment-actions">
                {editingComment === comment ? (
                  <>
                  <div className='comment-action-btn'>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </>
                ) : (
                  User.uid === comment.userId ? (
                    <>
                    <div className="comment-action-btn">
                      <button onClick={() => handleEditComment(comment)}>
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDeleteComment(comment)}>
                        <AiOutlineDelete /> Delete
                      </button>
                      <button onClick={() => handleOpenReplyModal(comment)}>
                        <FaReply /> Reply
                      </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleOpenReplyModal(comment)}>
                        <FaReply /> Reply
                      </button>
                    </>
                  )
                )}
                <div className="replying-comments">
                  <ReplyComponent postid={postid} commentid={comment.id} />
                </div>
              </div>
            </div>
            {/* Reply modal */}
            {replyingTo === comment && (
              <div className="reply-modal">
                <textarea
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button onClick={handleSubmitReply}>Reply</button>
                <button onClick={() => setReplyingTo(null)}>Cancel</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
