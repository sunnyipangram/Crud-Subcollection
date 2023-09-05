// UpdateData.js
import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

const UpdateData = ({ itemId, initialName, onUpdate }) => {
  const [newName, setNewName] = useState(initialName);

  const handleUpdate = async () => {
    try {
      const itemDoc = doc(db, 'items', itemId);
      await updateDoc(itemDoc, { name: newName });
      onUpdate(itemId, newName);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default UpdateData;
