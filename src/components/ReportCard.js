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

  const totalMarks = {
    PT1: report["PT1 TOTAL MARK"] || "-",
    PT2: report["PT2 TOTAL MARK"] || "-",
    HY: report["HY TOTAL MARK"] || "-",
    PT3: report["PT3 TOTAL MARK"] || "-",
    PT4: report["PT4 TOTAL MARK"] || "-",
    Annual: report["ANNUAL TOTAL MARK"] || "-",
  };

  const totalPercentage = {
    PT1: report["PT1 %age"] || "-",
    PT2: report["PT2 %age"] || "-",
    HY: report["HY %age"] || "-",
    PT3: report["PT3 %age"] || "-",
    PT4: report["PT4 %age"] || "-",
    Annual: report["ANNUAL %age"] || "-",
  };

  const coScholastic = [
    { id: 1, activity: "Health and Physical Education", grade: report["pe"] || "-" },
    { id: 2, activity: "Art", grade: report["am"] || "-" },
    { id: 3, activity: "Work Education", grade: report["we"] || "-" },
    { id: 4, activity: "Music", grade: report["music"] || "-" },
  ];

  return (
    <div className="report-container">
      <div className="report-card">
        <div className="header-section">
          <img src="/OdishaLogo.svg.png" alt="Left" className="header-image" />
          <div className="school-info">
            <p>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</p>
            <p>At/Po-Surada, Block-Surada, Dist-Ganjam, Pin-761108  sorada@oav.edu.in</p>
            <p>(OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)</p>
          </div>
          <img src="/OavLogo.jpeg" alt="Right" className="header-image" />
        </div>
        <h3>Affiliated to CBSE, New Delhi, Affiliation No. - 1520050, School No. - 17193, U-DISE CODE - 21192228501 </h3>
        <h2>PROGRESS REPORT CARD 2024-25</h2>
        <p><strong>Name:</strong> {studentInfo.name}</p>
        <p><strong>Class:</strong> {studentInfo.class} <strong>Section:</strong> {studentInfo.section} <strong>Roll No:</strong> {studentInfo.rollNumber}</p>

        <h3 className="table-heading">SCHOLASTIC DETAILS</h3>
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

        <h3 className="table-heading">CO-SCHOLASTIC DETAILS</h3>
        <table>
          <thead>
            <tr>
              <th>SL No</th>
              <th>Activity</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {coScholastic.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.activity}</td>
                <td>{activity.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="signature-section">
          <p>REMARK</p>
          <div className="signatures" style={{ flex: 1 }}>
            <p>Class Teacher: ______________</p>
            <p>Exam Incharge: ______________</p>
            <p>Principal: ______________</p>
          </div>
          <p className="parent-signature">Parent's Signature: ______________</p>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
