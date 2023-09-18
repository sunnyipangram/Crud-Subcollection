import React, { useState } from 'react';

const StorageForm = () => {
  const [fileURL, setFileURL] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    try {
      const fileRef = storageRef.child(`images/${file.name}`);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();
      setFileURL(downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Fetch and Retrieve Data from Firebase Storage</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {fileURL && <img src={fileURL} alt="Uploaded File" />}
    </div>
  );
};

export default StorageForm;
