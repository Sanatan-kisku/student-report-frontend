import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UploadFiles = () => {
  const [studentFile, setStudentFile] = useState(null);
  const [academicFile, setAcademicFile] = useState(null);

  const handleUpload = async () => {
    if (!selectedFiles.studentInfo || !selectedFiles.academicProgress) {
      alert("Please select both Excel files.");
      return;
    }

    const formData = new FormData();
    formData.append("studentInfo", selectedFiles.studentInfo);
    formData.append("academicProgress", selectedFiles.academicProgress);

    const token = localStorage.getItem("adminToken"); // Get token from storage

    if (!token) {
      alert("You must log in as an admin first.");
      return;
    }

    try {
      const response = await axios.post("https://student-report-backend.onrender.com/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data); // Show success message
    } catch (error) {
      console.error("Upload error:", error.response?.data || error);
      alert("Error uploading files. Check console.");
    }
  };


  return (
    <div>
      <h2>Admin File Upload</h2>
      <input type="file" onChange={(e) => setStudentFile(e.target.files[0])} />
      <input type="file" onChange={(e) => setAcademicFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFiles;
