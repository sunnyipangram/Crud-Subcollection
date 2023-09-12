import React, { useState } from 'react';
import { db } from '../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { FaHeart, FaReply, FaEllipsisH, FaEdit, FaRemoveFormat } from 'react-icons/fa';
import '../Comment.css';
import { AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';
import { useAppContext } from '../ContextApi/AppContext';
import ReplyComponent from './ReplyComponents';

const Comments = ({ postid, CommentCount, setCommentCount }) => {
  const query = collection(db, `Posts/${postid}/Comments`);
  const [docs, loading, error] = useCollectionData(query);
  const { User,UserProfile } = useAppContext();

  // State to track editing state
  const [editingComment, setEditingComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  
  // State to track whether the reply modal is open
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

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

  return (
    <div className="comments">
      {docs?.map((comment) => (
        <div className="comment" key={comment.id}>
          <img
            src={comment.userProfile}
            width={40}
            className="rounded-image"
            alt="User"
          />
          <div className="comment-content">
            <span className="name">{comment.userName}</span>
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
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                User.uid === comment.userId ? (
                  <>
                    <button onClick={() => handleEditComment(comment)}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDeleteComment(comment)}>
                      <AiOutlineDelete /> Delete
                    </button>
                    <button onClick={() => handleOpenReplyModal(comment)}>
                      <FaReply /> Reply
                    </button>
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
                
              </div>
            </div>
            <ReplyComponent postid={postid} commentid={comment.id}/>
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
              <button onClick={()=>setReplyingTo(null)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
