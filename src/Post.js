import React, { useState } from 'react';
import { db, storage } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AddComment from './Components/AddComment';
import { doc,updateDoc,collection,deleteDoc,getDoc } from 'firebase/firestore';
import Comments from './Components/Comments';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { FaCommentAlt, FaRegEdit, FaRegTrashAlt, FaShareAlt, FaTrashAlt, FaTrashRestoreAlt, FaUndo } from 'react-icons/fa';

const Post = () => {
  const query = collection(db, 'Posts');
  const [docs, loading, error] = useCollectionData(query);
  console.log(docs);

  // Function to calculate the time difference in minutes
  const getTimeAgo = (timestamp) => {
    if (!timestamp) {
      return 'Timestamp missing';
    }
  
    const now = new Date();
    const postTime = new Date(timestamp.toDate()); // Convert Firestore timestamp to JavaScript Date
    const timeDiff = now - postTime;
    const minutesAgo = Math.floor(timeDiff / (1000 * 60)); // Calculate minutes
  
    if (minutesAgo < 1) {
      return 'Less than a minute ago';
    } else if (minutesAgo === 1) {
      return '1 minute ago';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo === 1) {
        return '1 hour ago';
      } else if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
      } else {
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo === 1) {
          return '1 day ago';
        } else {
          return `${daysAgo} days ago`;
        }
      }
    }
  };
  

  // State to track editing state
  const [editingPost, setEditingPost] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Function to handle editing a post
  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.detail);
  };
  console.log(editingPost, 'edit post');

  // Function to handle saving edited post
  const handleSaveEdit = async () => {
    if (!editingPost) return;

    const postDocRef = doc(db, `Posts`, editingPost.id);
    await updateDoc(postDocRef, {
      title: newTitle,
      detail: newContent,
    });

    // Clear editing state
    setEditingPost(null);
    setNewTitle('');
    setNewContent('');
  };

  // Function to handle canceling edit
  const handleCancelEdit = () => {
    setEditingPost(null);
    setNewTitle('');
    setNewContent('');
  };

  // Function to handle deleting a post
  const handleDeletePost = async (post) => {
    console.log(post)
    const confirmation = window.confirm('Are you sure you want to delete this post?');
    if (confirmation) {
      const postDocRef = doc(db, 'Posts', post.id);

      // Get the post document data
      const postDocSnap = await getDoc(postDocRef);

      if (postDocSnap.exists()) {
        const postData = postDocSnap.data();
        const imageUrl = postData.image;

        // Delete the post document
        await deleteDoc(postDocRef);

        // Delete the image from storage
        const storageRef = storage.refFromURL(imageUrl);
        try {
          await storageRef.delete();
          console.log('Image deleted from storage');
        } catch (error) {
          console.error('Error deleting image from storage:', error);
        }
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-6">
          {docs?.map((post) => {
            return (
              <div className="card custom-card" key={post.id}>
                <div className="user-info">
                  <div className="user-avatar">
                    <img
                      src="https://i.imgur.com/UXdKE3o.jpg"
                      width={50}
                      className="rounded-circle"
                      alt="User"
                    />
                  </div>
                  <div className="user-details">
                    <span className="font-weight-bold">Jeanette Sun</span>
                    {/* <small className="text-primary">Colleagues</small> */}
                  </div>
                </div>
                <div className="timestamp">
                  <small>{getTimeAgo(post.timestamp)}</small>
                </div>
                <img
                  src={post.image}
                  className="img-fluid"
                  alt="Post"
                />
                <div className="p-2">
                  <p className="text-justify">
                    {editingPost === post ? (
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="input-edit-title"
                      />
                    ) : (
                      <span className="post-title">{post.title}</span>
                    )}
                  </p>
                  <p className="text-justify">
                    {editingPost === post ? (
                      <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="input-edit-content"
                      />
                    ) : (
                      <span className="post-content">{post.detail}</span>
                    )}
                  </p>
                  <div className="action-buttons">
                    {editingPost === post ? (
                      <>
                        <button onClick={handleSaveEdit} className="btn-save">Save</button>
                        <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
                      </>
                    ) : (
                      <>
                      <div>
                        <button onClick={() => handleEditPost(post)} className="btn-edit"><FaRegEdit/></button>
                        <button onClick={() => handleDeletePost(post)} className="btn-delete"><FaRegTrashAlt/></button>
                        </div>
                      </>
                    )}
                    <div className="d-flex flex-row muted-color">
                      <span className="comment-count" ><FaCommentAlt/> comments</span>
                      <span className="ml-2 share-btn"><FaShareAlt/> Share</span>
                    </div>
                  </div>
                  <hr />
                  <Comments id={post.id} />
                  <AddComment id={post.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
