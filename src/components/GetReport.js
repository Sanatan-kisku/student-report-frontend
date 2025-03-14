import React, { useState } from "react";
import axios from "axios";

const GetReport = () => {
  const [form, setForm] = useState({
    class: "",
    section: "",
    rollNumber: "",
    dob: "",
  });

  const [report, setReport] = useState(null);

  const fetchReport = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getReport", form);
      setReport(response.data);
    } catch (error) {
      alert("Student not found!");
    }
  };

  return (
    <div>
      <h2>Student Report Card</h2>
      <input placeholder="Class" onChange={(e) => setForm({ ...form, class: e.target.value })} />
      <input placeholder="Section" onChange={(e) => setForm({ ...form, section: e.target.value })} />
      <input placeholder="Roll Number" onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
      <input placeholder="Date of Birth" type="date" onChange={(e) => setForm({ ...form, dob: e.target.value })} />
      <button onClick={fetchReport}>Get Report</button>

      {report && (
        <div>
          <h3>Report Card</h3>
          <pre>{JSON.stringify(report, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetReport;
