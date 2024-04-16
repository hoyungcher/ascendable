// components/FileUpload.js

import { useState, ChangeEvent } from 'react';

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (event: ChangeEvent) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data); // Handle the response data as needed
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} accept=".igc" />
      <button onClick={onFileUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;