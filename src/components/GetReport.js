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
    // Convert date format from "YYYY-MM-DD" to "DD.MM.YYYY"
    const formattedDOB = form.dob.split("-").reverse().join(".");

    const formattedForm = {
      class: form.class.toUpperCase(), // Ensure "VI"
      section: form.section.toUpperCase(), // Ensure "A" or "B"
      rollNumber: parseInt(form.rollNumber), // Ensure number format
      dob: formattedDOB, // Convert "YYYY-MM-DD" to "DD.MM.YYYY"
    };

    try {
      const response = await axios.post(
        "https://student-report-backend.onrender.com/getReport",
        formattedForm
      );
      setReport(response.data);
    } catch (error) {
      alert("Student not found!");
    }
  };

  return (
    <div>
      <h2>Student Report Card</h2>
      <input
        placeholder="Class"
        onChange={(e) => setForm({ ...form, class: e.target.value })}
      />
      <input
        placeholder="Section"
        onChange={(e) => setForm({ ...form, section: e.target.value })}
      />
      <input
        placeholder="Roll Number"
        onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
      />
      <input
        placeholder="Date of Birth"
        type="date"
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />
      <button onClick={fetchReport}>Get Report</button>

      {report && (
        <div>
          <h3>Report Card - {report["NAME OF THE STUDENT"]}</h3>
          <p><strong>Roll No:</strong> {report["Roll No."]}</p>
          <p><strong>Class:</strong> {report["class"]} | <strong>Section:</strong> {report["Section"]}</p>

          <table border="1" style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>HY</th>
                <th>PT1</th>
                <th>PT2</th>
                <th>PT3</th>
                <th>PT4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>English</td>
                <td>{report["HY ENGLISH"]}</td>
                <td>{report["PT1 ENGLISH"]}</td>
                <td>{report["PT2 ENGLISH"]}</td>
                <td>{report["PT3 ENGLISH"]}</td>
                <td>{report["PT4 ENGLISH"]}</td>
              </tr>
              <tr>
                <td>Odia</td>
                <td>{report["HY ODIA"]}</td>
                <td>{report["PT1 ODIA"]}</td>
                <td>{report["PT2 ODIA"]}</td>
                <td>{report["PT3 ODIA"]}</td>
                <td>{report["PT4 ODIA"]}</td>
              </tr>
              <tr>
                <td>Hindi</td>
                <td>{report["HY HINDI"]}</td>
                <td>{report["PT1 HINDI"]}</td>
                <td>{report["PT2 HINDI"]}</td>
                <td>{report["PT3 HINDI"]}</td>
                <td>{report["PT4 HINDI"]}</td>
              </tr>
              <tr>
                <td>Sanskrit</td>
                <td>{report["HY SANSKRIT"]}</td>
                <td>{report["PT1 SANSKRIT"]}</td>
                <td>{report["PT2 SANSKRIT"]}</td>
                <td>{report["PT3 SANSKRIT"]}</td>
                <td>{report["PT4 SANSKRIT"]}</td>
              </tr>
              <tr>
                <td>Mathematics</td>
                <td>{report["HY MATHEMATICS"]}</td>
                <td>{report["PT1 MATHEMATICS"]}</td>
                <td>{report["PT2  MATHEMATICS"]}</td>
                <td>{report["PT3 MATHEMATICS"]}</td>
                <td>{report["PT4 MATHEMATICS"]}</td>
              </tr>
              <tr>
                <td>Science</td>
                <td>{report["HY SCIENCE"]}</td>
                <td>{report["PT1 SCIENCE"]}</td>
                <td>{report["PT2 SCIENCE"]}</td>
                <td>{report["PT3 SCIENCE"]}</td>
                <td>{report["PT4 SCIENCE"]}</td>
              </tr>
              <tr>
                <td>Social Science</td>
                <td>{report["HY  SOCIAL SCIENCE"]}</td>
                <td>{report["PT1   SOCIAL SCIENCE"]}</td>
                <td>{report["PT2   SOCIAL SCIENCE"]}</td>
                <td>{report["PT3  SOCIAL SCIENCE"]}</td>
                <td>{report["PT4  SOCIAL SCIENCE"]}</td>
              </tr>
              <tr>
                <td>ICT</td>
                <td>{report["HY          I C T"]}</td>
                <td>{report["PT1          I C T"]}</td>
                <td>{report["PT2          I C T"]}</td>
                <td>{report["PT3          I C T"]}</td>
                <td>{report["PT4          I C T"]}</td>
              </tr>
            </tbody>
          </table>

          <h4>Total Marks & Percentage</h4>
          <p><strong>HY Total:</strong> {report["HY TOTAL MARK"]} | <strong>HY %:</strong> {report["HY %age"]}%</p>
          <p><strong>Overall Rank:</strong> {report["rank"]}</p>
        </div>
      )}
    </div>
  );
};

export default GetReport;
