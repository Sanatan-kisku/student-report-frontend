import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const handleUpload = async () => {
  if (!selectedFiles.studentInfo || !selectedFiles.academicProgress) {
    alert("Please select both Excel files.");
    return;
  }

  const formData = new FormData();
  formData.append("studentInfo", selectedFiles.studentInfo);
  formData.append("academicProgress", selectedFiles.academicProgress);

  const token = localStorage.getItem("adminToken"); // Retrieve admin token

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

export default UploadFiles;
