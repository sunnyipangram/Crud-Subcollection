// ManageData.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './FirebaseConfig';
import DisplayData from './DisplayData';
import AddData from './AddData';
import UpdateData from './UpdateData';

const ManageData = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'items', itemId));
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleUpdate = (itemId, newName) => {
    // Update the local state with the new name
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, name: newName } : item
      )
    );
    // Clear the editing state
    setEditingItem(null);
  };

  return (
    <div>
      <h2>Manage Items</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editingItem === item.id ? (
                  <UpdateData
                    itemId={item.id}
                    initialName={item.name}
                    onUpdate={handleUpdate}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingItem !== item.id ? (
                  <>
                    <button onClick={() => setEditingItem(item.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddData />
    </div>
  );
};

export default ManageData;
