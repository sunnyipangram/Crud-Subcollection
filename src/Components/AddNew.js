import React, { useRef, useState } from 'react';
import { db, storage } from '../FirebaseConfig';
import { collection, addDoc, DocumentReference, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FaRegImages, FaUpload } from 'react-icons/fa';

const AddNew = ({ path }) => {
  const title = useRef();
  const postDetail = useRef();
  const hashtags = useRef();
  const imageInput = useRef();
  const [imageUrl, setImageUrl] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);

  const handleImageUpload = async () => {
    const file = imageInput.current.files[0];
    if (file) {
      const imgId = uuidv4();
      const storageRef = ref(storage, `postImages/${imgId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressPercent(progress);
        },
        (error) => {
          console.error('Error uploading image: ', error);
        },
        async () => {
          // Upload complete, get the download URL
          const downloadURL = await getDownloadURL(storageRef);
         await setImageUrl(downloadURL);
          // console.log(downloadURL)
          // console.log(imageUrl)
        }
      );
    } else {
      alert('Please provide a file');
    }
  };
 
  const handleSubmitTask = async (e) => {
    e.preventDefault();

    // API call
    if(imageUrl===null){return alert('please add image') }
    const uniqueId = uuidv4();
   const docRef=doc(db,path,uniqueId)

    try {
      await setDoc(docRef, {
        title: title.current.value,
        detail: postDetail.current.value,
        hashTag: hashtags.current.value.split(','),
        image: imageUrl,
        id: uniqueId,
        timestamp: new Date(), // Store the timestamp
      });

      // Clear form values and image URL
      title.current.value = '';
      postDetail.current.value = '';
      hashtags.current.value = '';
      setImageUrl(null);
      alert("post Successfully created")
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="add-post-form">
    <form action="" onSubmit={handleSubmitTask}>
      <input className="add-post-input" placeholder="Add Title..." type="text" ref={title} />
      <input className="add-post-textarea" placeholder="Add Post Content..." type="text" ref={postDetail} />
      <input placeholder="Add Hashtags (comma-separated)" className='add-hastag-input' type="text" ref={hashtags} />
      <label htmlFor="image-upload" className="add-post-image-label">
    <input
      id="image-upload"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      ref={imageInput}
      className="add-post-image-input"
    />
    <FaRegImages className="icon" /> Upload Image
  </label>
  {imageUrl && (
    <img
      src={imageUrl}
      alt="Uploaded"
      className="add-post-image-preview"
    />
  )}
  {progressPercent > 0 && (
    <div>Uploading: {progressPercent.toFixed(2)}%</div>
  )}
  <button type="submit" className="add-post-submit">
    Post <FaUpload />
  </button>
  </form>
    </div>
  );
};

export default AddNew;
