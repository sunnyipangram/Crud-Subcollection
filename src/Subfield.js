// Subfield.js
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

const Subfield = ({ item, onClose }) => {
  const [subfieldName, setSubfieldName] = useState('');

  const handleUpdateSubfield = async () => {
    try {
      const itemRef = doc(db, 'your-collection-name', item.id);
      await updateDoc(itemRef, {
        subfield: subfieldName,
      });
      onClose();
    } catch (error) {
      console.error('Error updating subfield: ', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter subfield name"
        value={subfieldName}
        onChange={(e) => setSubfieldName(e.target.value)}
      />
      <button onClick={handleUpdateSubfield}>Update Subfield</button>
    </div>
  );
};

export default Subfield;