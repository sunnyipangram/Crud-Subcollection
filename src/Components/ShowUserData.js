import React, { useState } from 'react';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ShowUserData = ({ users }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const query = collection(db, 'Users');
  const [docs, loading, error] = useCollectionData(query);
  // console.log(docs,loading,error)

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUserData({ ...user });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleSaveEdit = async () => {
    // Update the user's data in Firestore
    const userRef = doc(db, 'Users', editedUserData.id);
    await updateDoc(userRef, editedUserData);

    setEditingUserId(null);
  };

  const handleDeleteClick = async (user) => {
    console.log(user)
    // Prompt the user for confirmation
    const confirmation = window.confirm(`Delete user: ${user.name.first} ${user.name.last}?`);

    if (confirmation) {
      setIsDeleting(true);

      // Delete the user's data from Firestore
      const userRef = doc(db, 'Users', user.id);
      await deleteDoc(userRef);

      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2>User Data</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {docs?.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUserData.name.first}
                    onChange={(e) => setEditedUserData({ ...editedUserData, name: { ...editedUserData.name, first: e.target.value } })}
                  />
                ) : (
                  user.name.first
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUserData.name.last}
                    onChange={(e) => setEditedUserData({ ...editedUserData, name: { ...editedUserData.name, last: e.target.value } })}
                  />
                ) : (
                  user.name.last
                )}
              </td>
              <td>{user.email}</td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(user)}>Edit</button>
                    <button onClick={() => handleDeleteClick(user)} disabled={isDeleting}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUserData;
