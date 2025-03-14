import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/GetReport.css"; // Ensure this file exists

const classMapping = {
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  11: "XI",
  12: "XII",
};

const GetReport = () => {
  const [form, setForm] = useState({
    class: "6",
    section: "A",
    rollNumber: 1,
    dob: "",
  });
  const [_, setReport] = useState(null);
  const navigate = useNavigate();

  const fetchReport = async () => {
    const formattedDOB = form.dob.split("-").reverse().join(".");
    const formattedClass = classMapping[form.class]; // Convert 6 to "VI", 7 to "VII", etc.

    const formattedForm = {
      class: formattedClass, // Send "VI" instead of 6
      section: form.section.toUpperCase(),
      rollNumber: parseInt(form.rollNumber),
      dob: formattedDOB,
    };

    try {
      const response = await axios.post("https://student-report-backend.onrender.com/getReport", formattedForm);
      setReport(response.data);
      navigate("/report-card", { state: { report: response.data } });
    } catch (error) {
      alert("Student not found!");
    }
  };

  return (
    <div className="get-report-container">
      <div className="form-box">
        <h2>Student Report Card</h2>
        <label>Class</label>
        <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i + 6}>{i + 6}</option>
          ))}
        </select>

        <label>Section</label>
        <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>

        <label>Roll Number</label>
        <div className="roll-number-box">
          <button onClick={() => setForm({ ...form, rollNumber: Math.max(1, form.rollNumber - 1) })}>-</button>
          <input type="number" value={form.rollNumber} readOnly />
          <button onClick={() => setForm({ ...form, rollNumber: form.rollNumber + 1 })}>+</button>
        </div>

        <label>Date of Birth</label>
        <input type="date" onChange={(e) => setForm({ ...form, dob: e.target.value })} />

        <button className="get-report-btn" onClick={fetchReport}>Get Report</button>
      </div>
    </div>
  );
};

export default GetReport;
