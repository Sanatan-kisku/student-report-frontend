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
    rollNumber: "",
    dob: "",
  });
  const [_, setReport] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const publishedClasses = [6, 7, 8, 9, 11]; // Classes with published reports

  const fetchReport = async () => {

    setLoading(true); // Show loading
    const formattedDOB = form.dob.split("-").reverse().join(".");
    const formattedClass = classMapping[form.class];

    const formattedForm = {
      class: formattedClass,
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
    setLoading(false); // Hide loading
  };


  return (
    <div className="get-report-container">
      <h1 className="school-heading">Odisha Adarsha Vidyalaya, Surada, Ganjam</h1>
      {/* Principal's Image and Details */}
      <div className="principal-container">
        <img src="/principal.jpg" alt="Principal" className="principal-image" />
        <p className="principal-name">Mr. Ashis Mishra</p>
        <p className="principal-designation">Principal, OAV Surada</p>
      </div>
      {/* Exam Incharge's Image and Details */}
      <div className="principal-container">
        <img src="/examincharge.jpg" alt="Exam Incharge" className="examincharge-image" />
        <p className="examincharge-name">Mr. Chinmaya kumar Panigrahi</p>
        <p className="examincharge-designation">Exam Incharge, OAV Surada</p>
      </div>
      <div className="form-box">
        <h2>Student Report Card</h2>
        {/* Show a message when reports are available */}
        {publishedClasses.length > 0 && (
          <p className="published-info">
            📢 Annual Report Card for Class {publishedClasses.join(", ")} has been published!
          </p>
        )}
        <div className="form-row">
          <div>
            <label>Class</label>
            <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
              {[...Array(7)].map((_, i) => (
                <option key={i} value={i + 6}>{i + 6}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Section</label>
            <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div>
            <label>Roll Number</label>
            <input
              type="number"
              value={form.rollNumber}
              onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
              min="1"
            />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label>Date of Birth</label>
            <input type="date" onChange={(e) => setForm({ ...form, dob: e.target.value })} />
          </div>
        </div>
        <div>

        </div>
        <button className="get-report-btn" onClick={fetchReport}>Get Report</button>
        {loading && <p>Loading Report...</p>}
      </div>
    </div>
  );
};

export default GetReport;