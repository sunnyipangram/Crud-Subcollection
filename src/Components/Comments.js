import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FaHeart, FaReply, FaEllipsisH, FaEdit, FaRemoveFormat } from 'react-icons/fa'; // Import icons
import '../Comment.css'; // Import your custom CSS file
import { AiOutlineDelete } from 'react-icons/ai';
import { useAppContext } from '../ContextApi/AppContext';


const Comments = ({ id,CommentCount,setCommentCount }) => {
  const query = collection(db, `Posts/${id}/Comments`);
  
  const [docs, loading, error] = useCollectionData(query);
  // console.log(docs, 'comments');

  

  // State to track editing state
  const [editingComment, setEditingComment] = useState(null);
  const [newComment, setNewComment] = useState('');

  // Function to handle editing a comment
  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.comment);
  };

  // Function to handle saving edited comment
  const handleSaveEdit = async () => {
    if (!editingComment) return;

    const commentDocRef = doc(
      db,
      `Posts/${id}/Comments`,
      editingComment.id
    );
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
      const commentDocRef = doc(
        db,
        `Posts/${id}/Comments`,
        comment.id
      );
      await deleteDoc(commentDocRef);
    }
  };

  return (
    <div className="comments">
      {docs?.map((comment) => (
        <div className="comment" key={comment.id}>
          <img
            src="https://i.imgur.com/9AZ2QX1.jpg"
            width={40}
            className="rounded-image"
            alt="User"
          />
          <div className="comment-content">
            <span className="name">Daniel Frozer</span>
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
                <>
                  <button onClick={() => handleEditComment(comment)}>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment)}>
                    <AiOutlineDelete /> Delete
                  </button>
                </>
              )}
              {/* <FaHeart /> Like
              <FaReply /> Reply */}
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
