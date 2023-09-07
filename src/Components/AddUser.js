import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import {v4 as uuidv4}from 'uuid'

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [born, setBorn] = useState('');
  const [Surname, setSurname] = useState('')
  const uniqueId=uuidv4();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        id:uniqueId,
        name: {
          first: firstName,
          last: lastName,
          surname:{
            first:Surname
          }
        },
        createdAt: new Date().getTime(),
        born: Number(born) // Ensure it's stored as a number
      };

      const docRef = await addDoc(collection(db, 'Users'), data);
      console.log('Document added with ID: ', docRef.id);

      // Clear the form inputs
      setFirstName('');
      setLastName('');
      setBorn('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Born"
        value={born}
        onChange={(e) => setBorn(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={Surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddUser;
