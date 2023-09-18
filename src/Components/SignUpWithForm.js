import React, { useState } from 'react';
import { auth, db } from '../FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Link} from 'react-router-dom';

const SignUpWithForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create a new user with email and password
      const { email, password } = formData;
      const userCredential =await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      // Step 2: Store user data in Firestore
      const userDocRef = doc(collection(db, 'Users'), user.uid);
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact,
        profileImage:"https://www.kindpng.com/picc/m/668-6689202_avatar-profile-hd-png-download.png"

        // Add more fields as needed
      };
      await setDoc(userDocRef, userData);

      // Clear the form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        contact: '',
      });

      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-form">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
          />
        </div>
        <Link to={'/login'}>Already Have an account?</Link> <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpWithForm
;
