import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import AddComment from './Components/AddComment';
import { doc, updateDoc, collection, deleteDoc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import Comments from './Components/Comments';
import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { FaCommentAlt, FaRegEdit, FaRegTrashAlt, FaShareAlt } from 'react-icons/fa';
import { useAppContext } from './ContextApi/AppContext';
import CommentsNumber from './Components/CommentsNumber';
import Sidebar from './Components/Sidebar';
import UserName from './ExtractingData/UserName';
import StyledNewPost from './Components/StyledNewPost';

const Post = () => {
  const query = collection(db, 'Posts');
  const [docs, loading, error] = useCollectionData(query);
  const { User, UserProfile, setUserProfile} = useAppContext();
  const [liked, setLiked] = useState({});
  const [postUsers, setPostUsers] = useState({});
  // console.log(docs[0])


  useEffect(() => {
    if (User) {
      // Fetch the user's liked posts
      const userLikesRef = collection(db, 'Posts', User.uid, 'Likes');
      const unsubscribe = onSnapshot(userLikesRef, (snapshot) => {
        const likedPosts = {};
        snapshot.forEach((doc) => {
          likedPosts[doc.id] = true;
        });
        setLiked(likedPosts);
      });

      return () => {
        // Unsubscribe from the snapshot listener
        unsubscribe();
      };
    }
    if (UserProfile) {
      // Fetch the posts based on the updated user profile data
      const userPostsQuery = collection(db, 'Posts').where('user.id', '==', UserProfile.uid);
      const unsubscribe = onSnapshot(userPostsQuery, (snapshot) => {
        const updatedPosts = snapshot.docs.map((doc) => doc.data());
        // Update your state with the updated posts
        setDoc(updatedPosts);
      });

      return () => {
        // Unsubscribe from the snapshot listener
        unsubscribe();
      };
    }
  }, [User,UserProfile]);

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

        // Delete the image from storage (uncomment if needed)
        // const storageRef = storage.refFromURL(imageUrl);
        // try {
        //   await storageRef.delete();
        //   console.log('Image deleted from storage');
        // } catch (error) {
        //   console.error('Error deleting image from storage:', error);
        // }
      }
    }
  };

  // Function to handle liking a post
  const handleLikePost = async (post) => {
    if (post.userName) {
      const postLikesRef = doc(db, `Posts/${post.id}/Likes`, User.uid);

      try {
        if (!liked[post.id]) {
          // The user hasn't liked the post yet, so add a like
          await setDoc(postLikesRef, {
            timestamp: serverTimestamp(),
            user: post.userName,
          });
        } else {
          // The user has already liked the post, so unlike it
          await deleteDoc(postLikesRef);
        }

        // Update the liked state
        setLiked({ ...liked, [post.id]: !liked[post.id] });
      } catch (error) {
        console.error('Error liking/unliking post:', error);
      }
    } else {
      // User is not logged in, handle this case as needed
      console.log('User is not logged in. Handle this case.');
    }
  };

  // Function to fetch user data for a post
  const fetchUserDataForPost = async (post) => {
    try {
      const userDoc = await getDoc(doc(db, 'Users', post.user.id));
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
  useEffect(()=>{
fetchUserDataForPost()
  },[User,UserProfile])

  useEffect(() => {
    if (docs) {
      // Fetch user data for each post concurrently
      Promise.all(docs.map(fetchUserDataForPost))
        .then((userDataArray) => {
          // Create a map of user data with post IDs as keys
          const userDataMap = userDataArray.reduce((acc, userData, index) => {
            acc[docs[index].id] = userData;
            return acc;
          }, {});
          setPostUsers(userDataMap);
        })
        .catch((error) => {
          console.error('Error fetching user data for posts:', error);
        });
    }
  }, [docs,UserProfile,User]);
 
  

  return (
    <div className="container mt-5 mb-5">
     
      <div className="row d-flex  justify-content-center">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-6">
        <StyledNewPost UserProfile={UserProfile}/>
          {docs?.map((post) => {
         
            const PostUser = postUsers[post.id] || {}; // Get user data from the map
          
            
           
            return (
              <div className="card custom-card" key={post.id}>
                <div className="user-info">
                  <div className="user-avatar">
                    <img src={PostUser.profileImage} width={50} height={50} className="rounded-circle" alt="User" />
                  </div>
                  <div className="user-details">
                    <span className="font-weight-bold">{PostUser.firstName} {PostUser.lastName}</span>
                  </div>
                </div>
                <div className="timestamp">
                  <small>{getTimeAgo(post.timestamp)}</small>
                </div>
             {post.mediaType==="video" &&              <video controls src={post.media} style={{height:'auto',width:'100%'}} className="add-post-media-preview"></video>} 
             {post.mediaType==="image" &&               <img src={post.media} className="img-fluid" alt="Post" />} 

               {/* <img src={post.image} className="img-fluid" alt="Post" /> */}
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span
                            onClick={() => handleLikePost(post)}
                            className={`btn-like ${liked[post.id] ? 'liked' : ''}`}
                          >
                            <AiFillLike /> Like
                          </span>
                          <CommentsNumber id={post.id} />
                          <FaCommentAlt />
                          <span className="ml-2 share-btn">
                            <FaShareAlt /> Share
                          </span>
                        </div>
                      </>
                    )}
                    <div>
                      {User.uid === post.user.id ? (
                        <>
                         
                          <button onClick={() => handleEditPost(post)} className="btn-edit">
                            <FaRegEdit />
                          </button>
                          <button onClick={() => handleDeletePost(post)} className="btn-delete">
                            <FaRegTrashAlt />
                          </button>
                        </>
                      ) : (
                        <>
                         
                          <button onClick={() => handleEditPost(post)} className="btn-edit">
                            <FaRegEdit />
                          </button>
                          <button onClick={() => handleDeletePost(post)} className="btn-delete">
                            <FaRegTrashAlt />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <hr />
                  <Comments postid={post.id} />
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
