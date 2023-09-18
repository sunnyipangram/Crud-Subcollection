import React, { useRef, useState } from 'react';
import { db, storage } from '../FirebaseConfig';
import {  setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FaRegImages, FaRegFileVideo, FaUpload } from 'react-icons/fa';
import { useAppContext } from '../ContextApi/AppContext';

const AddNew = ({ path }) => {
  const title = useRef();
  const postDetail = useRef();
  const hashtags = useRef();
  const mediaInput = useRef();
  const [mediaUrl, setMediaUrl] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [mediaType, setMediaType] = useState(''); // Store media type (image or video)
  const { User, UserProfile, setOpen } = useAppContext();

  const handleMediaUpload = async () => {
    const file = mediaInput.current.files[0];
    if (file) {
      const mediaId = uuidv4();
      const storageRef = ref(storage, `mediaFiles/${mediaId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressPercent(progress);
        },
        (error) => {
          console.error('Error uploading media: ', error);
        },
        async () => {
          // Upload complete, get the download URL
          const downloadURL = await getDownloadURL(storageRef);
          setMediaUrl(downloadURL);

          // Determine media type
          if (file.type.startsWith('image')) {
            setMediaType('image');
          } else if (file.type.startsWith('video')) {
            setMediaType('video');
          }
        }
      );
    } else {
      alert('Please provide a media file');
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    // API call
    if (mediaUrl === '') {
      return alert('Please add media (image or video)');
    }
    const uniqueId = uuidv4();
    const docRef = doc(db, path, uniqueId);

    try {
      await setDoc(docRef, {
        title: title.current.value,
        detail: postDetail.current.value,
        hashTag: hashtags.current.value.split(','),
        media: mediaUrl,
        mediaType: mediaType, // Store media type
        id: uniqueId,
        timestamp: new Date(),
        user: UserProfile,
      });

      // Clear form values and media URL
      title.current.value = '';
      postDetail.current.value = '';
      hashtags.current.value = '';
      setMediaUrl('');
      setMediaType('');
      alert('Post successfully created');
      setOpen(false);
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
        <label htmlFor="media-upload" className="add-post-media-label">
          <input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            ref={mediaInput}
            className="add-post-media-input"
          />
          <FaRegImages className="icon" /> Upload Image / <FaRegFileVideo className="icon" /> Upload Video
        </label>
        {mediaUrl && (
          <>
            {mediaType === 'image' ? (
              <img src={mediaUrl} alt="Uploaded" className="add-post-media-preview" style={{height:'100px'}} />
            ) : (
              <video controls src={mediaUrl} style={{height:'100px'}} className="add-post-media-preview"></video>
            )}
          </>
        )}
        {progressPercent > 0 && (
          <div>
            Uploading: {progressPercent.toFixed(2)}%
            <progress value={progressPercent} max="100"></progress>
          </div>
        )}
        <button type="submit" className="add-post-submit">
          Post <FaUpload />
        </button>
      </form>
    </div>
  );
};

export default AddNew;
