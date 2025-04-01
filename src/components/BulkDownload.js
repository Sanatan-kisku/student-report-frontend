import React, { useState } from "react";
import axios from "axios";

const BulkDownload = () => {
  const [selectedClass, setSelectedClass] = useState("6");
  const [selectedSection, setSelectedSection] = useState("A");

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `https://student-report-backend.onrender.com/api/bulkDownload/${selectedClass}/${selectedSection}`,
        { responseType: "blob" } // Important for file download
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Class_${selectedClass}_Section_${selectedSection}_Report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error downloading reports.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Bulk Download Reports</h2>
      <div>
        <label>Select Class: </label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i + 6}>{i + 6}</option>
          ))}
        </select>

        <label>Select Section: </label>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <button onClick={handleDownload}>Download Class Report</button>
      </div>
    </div>
  );
};

export default BulkDownload;
