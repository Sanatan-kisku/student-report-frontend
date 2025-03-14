import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UploadFiles = () => {
  const [studentFile, setStudentFile] = useState(null);
  const [academicFile, setAcademicFile] = useState(null);

  const handleUpload = async () => {
    if (!studentFile || !academicFile) {
      toast.error("Both files are required!");
      return;
    }

    const formData = new FormData();
    formData.append("studentInfo", studentFile);
    formData.append("academicProgress", academicFile);

    try {
      await axios.post("https://student-report-backend.onrender.com/upload", formData);
      toast.success("Files uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading files");
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
