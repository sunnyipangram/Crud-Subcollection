import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { db, storage } from '../FirebaseConfig';
import { auth } from '../FirebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../ContextApi/AppContext';

const EditProfileComponent = () => {
  const { UserProfile, setUserProfile } = useAppContext();
  const user = auth.currentUser;

  const [userData, setUserData] = useState({
    firstName: UserProfile?.firstName,
    lastName: UserProfile?.lastName,
    age: UserProfile?.age,
    gender: UserProfile?.gender,
    contact: UserProfile?.contact,
    profileImage: UserProfile?.profileImage,
    bio: UserProfile?.bio,
    location: UserProfile?.location
  });

  const [progressPercent, setProgressPercent] = useState(0);
  const imageInputProfile = useRef(null);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const userDocRef = doc(collection(db, 'Users'), user.uid);
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUserData(data);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    setUserProfile(userData);
  }, [userData, setUserProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageUpload = async () => {
    const file = imageInputProfile.current.files[0];
    if (file) {
      setIsUploading(true);
      const imgId = uuidv4();
      const storageRef = ref(storage, `profileImages/${user.uid}/${imgId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressPercent(progress);
        },
        (error) => {
          console.error('Error uploading image: ', error);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          setUserData({
            ...userData,
            profileImage: downloadURL,
          });
          setIsUploading(false);
        }
      );
    } else {
      alert('Please provide a file');
    }
  };

  const saveProfile = async () => {
    if (isUploading) {
      alert('Please wait for the image to finish uploading.');
      return;
    }

    try {
      const userDocRef = doc(collection(db, 'Users'), user.uid);
      await updateDoc(userDocRef, userData);
      alert('Profile data updated');
      setUserProfile(userData);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return (
    <div className="container rounded bg-white mt-5">
      <div className="row">
        <div className="col-md-4 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" src={UserProfile?.profileImage} width={90} height={90} alt="Profile" />
            <span className="font-weight-bold">{UserProfile?.firstName + ' ' + UserProfile?.lastName}</span>
            <span className="text-black-50">{UserProfile?.contact}</span>
            <span>{UserProfile?.age} Years Old</span>
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex flex-row align-items-center back">
                <i className="fa fa-long-arrow-left mr-1 mb-1" />
                <h6>Back to home</h6>
              </div>
              <h6 className="text-right">Edit Profile</h6>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Age"
                  name="age"
                  value={userData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gender"
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter Your Loacation"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact"
                  name="contact"
                  value={userData.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={imageInputProfile}
                  className="add-post-image-input"
                />
              </div>
            </div>
            {isUploading && (
              <div className="progress mt-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progressPercent}%` }}
                  aria-valuenow={progressPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progressPercent.toFixed(2)}%
                </div>
              </div>
            )}
            <div className="mt-5 text-right">
              <button className="btn btn-primary profile-button" type="button" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponent;
