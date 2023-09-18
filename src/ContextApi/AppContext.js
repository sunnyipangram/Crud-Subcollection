import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../FirebaseConfig';

import {  doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [CommentCount, setCommentCount] = useState(null);
  const [User, setUser] = useState(null);
  const [UserProfile, setUserProfile] = useState(null);

  useEffect(() => {
    console.log('Starting useEffect');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user);
      if (user) {
        setUser(user);
        const docRef = doc(db, 'Users', user.uid); // Use 'user.uid' directly
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data(), "user data"); // Access the user data

        if (docSnap.exists()) {
          // If the document exists, it means the user profile is already updated.
          setUserProfile(docSnap.data());
        } else {
          // If the document does not exist, create a new user profile document.
          await setDoc(docRef, {
            id: user.uid,
            name: { firstName: '', lastName: '' },
            age: null,
            gender: null,
            profileUrl: '',
            contact: null,
          });
        }
      } else {
        // Handle signed out state
        setUser(null); // Set user to null when signed out
      }
    });

    // Don't forget to unsubscribe when the component unmounts
    return () => {
      console.log('Cleaning up useEffect');
      unsubscribe();
    };
  }, []); // Removed 'User' from the dependency array

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign the user out
      console.log('User signed out');
      // You can also redirect the user to a different page after logout, if needed.
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{ CommentCount, setCommentCount, User, setUser, handleLogout, open, setOpen, UserProfile,setUserProfile }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
