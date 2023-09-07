// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCoq1qDwUSsx9YRWLiCzK0D07iCIsa6j4",
  authDomain: "sub-collections-in-firebase.firebaseapp.com",
  projectId: "sub-collections-in-firebase",
  storageBucket: "sub-collections-in-firebase.appspot.com",
  messagingSenderId: "362701810061",
  appId: "1:362701810061:web:fb442e53d43c4fcfe775c4",
  measurementId: "G-MSHDXDGPLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);
export const storage=getStorage(app);