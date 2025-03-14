import React, { useState } from "react";
import axios from "axios";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    studentInfo: null,
    academicProgress: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [event.target.name]: file,
    }));
  };

  const handleUpload = async () => {
    if (!selectedFiles.studentInfo || !selectedFiles.academicProgress) {
      alert("Please select both Excel files.");
      return;
    }

    const formData = new FormData();
    formData.append("studentInfo", selectedFiles.studentInfo);
    formData.append("academicProgress", selectedFiles.academicProgress);

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You must log in as an admin first.");
      return;
    }

    try {
      const response = await axios.post("https://student-report-backend.onrender.com/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (progressEvent) => {
          console.log(`Upload Progress: ${Math.round((progressEvent.loaded * 100) / progressEvent.total)}%`);
        },
      });

      alert(response.data);
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Error uploading files: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload Student Data</h2>
      <input type="file" name="studentInfo" onChange={handleFileChange} />
      <input type="file" name="academicProgress" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFiles;
