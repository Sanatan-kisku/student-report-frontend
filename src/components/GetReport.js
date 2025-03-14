import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetReport = () => {
  const [form, setForm] = useState({
    class: "",
    section: "",
    rollNumber: "",
    dob: "",
  });
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  const fetchReport = async () => {
    const formattedDOB = form.dob.split("-").reverse().join(".");

    const formattedForm = {
      class: form.class.toUpperCase(),
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
    <div>
      <h2>Student Report Card</h2>
      <input placeholder="Class" onChange={(e) => setForm({ ...form, class: e.target.value })} />
      <input placeholder="Section" onChange={(e) => setForm({ ...form, section: e.target.value })} />
      <input placeholder="Roll Number" onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
      <input placeholder="Date of Birth" type="date" onChange={(e) => setForm({ ...form, dob: e.target.value })} />
      <button onClick={fetchReport}>Get Report</button>
    </div>
  );
};

export default GetReport;
