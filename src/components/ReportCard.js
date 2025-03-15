import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/ReportCard.css"; // Ensure correct styling

const ReportCard = () => {
  const location = useLocation();
  const report = location.state?.report || null;

  if (!report) {
    return <h2>No Report Found</h2>;
  }

  const studentInfo = {
    name: report["NAME OF THE STUDENT"],
    rollNumber: report["Roll No."],
    section: report["Section"],
    class: report["class"],
    rank: report["rank"],
    result: report["result"],
  };

  const subjects = Object.keys(report)
    .filter((key) => key.includes("HY ") || key.includes("PT") || key.includes("ANNUAL"))
    .reduce((acc, key) => {
      const subjectName = key.replace(/HY |PT[1-4] |ANNUAL /g, "").trim();
      if (!acc.includes(subjectName)) acc.push(subjectName);
      return acc;
    }, []);

  const formatPercentage = (value) => {
    return value !== "-" ? parseFloat(value).toFixed(2) : "-";
  };

  const totalMarks = {
    PT1: report["PT1 TOTAL MARK"] || "-",
    PT2: report["PT2 TOTAL MARK"] || "-",
    HY: report["HY TOTAL MARK"] || "-",
    PT3: report["PT3 TOTAL MARK"] || "-",
    PT4: report["PT4 TOTAL MARK"] || "-",
    Annual: report["ANNUAL TOTAL MARK"] || "-",
  };

  const totalPercentage = {
    PT1: formatPercentage(report["PT1 %age"] || "-"),
    PT2: formatPercentage(report["PT2 %age"] || "-"),
    HY: formatPercentage(report["HY %age"] || "-"),
    PT3: formatPercentage(report["PT3 %age"] || "-"),
    PT4: formatPercentage(report["PT4 %age"] || "-"),
    Annual: formatPercentage(report["ANNUAL %age"] || "-"),
  };

  return (
    <div className="report-container">
      <div className="report-card">
        <div className="header-section">
          <img src="/OdishaLogo.svg.png" alt="Left" className="header-image" style={{ height: "130px" }} />
          <div className="school-info">
            <p>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</p>
            <p>At/Po-Surada, Block-Surada, Dist-Ganjam, Pin-761108  sorada@oav.edu.in</p>
            <p>(OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)</p>
          </div>
          <img src="/OavLogo.jpeg" alt="Right" className="header-image" style={{ height: "130px" }} />
        </div>
        <h2>PROGRESS REPORT CARD 2024-25</h2>
        <p><strong>Name:</strong> {studentInfo.name}</p>
        <p><strong>Class:</strong> {studentInfo.class} <strong>Section:</strong> {studentInfo.section} <strong>Roll No:</strong> {studentInfo.rollNumber}</p>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>PT1</th>
              <th>PT2</th>
              <th>HY</th>
              <th>PT3</th>
              <th>PT4</th>
              <th>Annual</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{report[`PT1 ${subject}`] || "-"}</td>
                <td>{report[`PT2 ${subject}`] || "-"}</td>
                <td>{report[`HY ${subject}`] || "-"}</td>
                <td>{report[`PT3 ${subject}`] || "-"}</td>
                <td>{report[`PT4 ${subject}`] || "-"}</td>
                <td>{report[`ANNUAL ${subject}`] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Rank: {studentInfo.rank}</h3>
        <h3>Result: {studentInfo.result}</h3>

        <div className="signature-section">
          <p className="remarks">Remarks: </p>
          <div className="signatures">
            <p style={{ flex: 1, textAlign: "center" }}>Class Teacher: ______________</p>
            <p style={{ flex: 1, textAlign: "center" }}>Exam Incharge: ______________</p>
            <p style={{ flex: 1, textAlign: "center" }}>Principal: ______________</p>
          </div>
          <p className="parent-signature" style={{ textAlign: "center", marginTop: "10px" }}>Parent's Signature: ______________</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
