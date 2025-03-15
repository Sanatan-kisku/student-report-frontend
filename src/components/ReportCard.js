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
    HY: report["HY TOTAL MARK"] || "-",
    PT1: report["PT1 TOTAL MARK"] || "-",
    PT2: report["PT2 TOTAL MARK"] || "-",
    PT3: report["PT3 TOTAL MARK"] || "-",
    PT4: report["PT4 TOTAL MARK"] || "-",
    Annual: report["ANNUAL TOTAL MARK"] || "-",
  };

  const totalPercentage = {
    HY: report["HY %age"] || "-",
    PT1: report["PT1 %age"] || "-",
    PT2: report["PT2 %age"] || "-",
    PT3: report["PT3 %age"] || "-",
    PT4: report["PT4 %age"] || "-",
    Annual: report["ANNUAL %age"] || "-",
  };

  const coScholastic = [
    { id: 1, activity: "Health and Physical Education", grade: report["pe"] || "-" },
    { id: 2, activity: "Art", grade: report["am"] || "-" },
    { id: 3, activity: "Work Education", grade: report["pe"] || "-" },
    { id: 4, activity: "Music", grade: report["am"] || "-" },
  ];

  return (
    <div className="report-container">
      <div className="header-section">
        <img src="../../public/OdishaLogo.svg.png" alt="Left" className="header-image" />
        <div className="school-info">
          <p>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</p>
          <p>At/Po-Surada, Block-Surada, Dist-Ganjam, Pin-761108  sorada@oav.edu.in</p>
          <p>(OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)</p>
        </div>
        <img src="../../OavLogo.jpeg" alt="Right" className="header-image" />
      </div>

      <div className="report-card">
        <h2>PROGRESS REPORT CARD 2024-25</h2>
        <p><strong>Name:</strong> {studentInfo.name}</p>
        <p><strong>Class:</strong> {studentInfo.class} <strong>Section:</strong> {studentInfo.section} <strong>Roll No:</strong> {studentInfo.rollNumber}</p>

        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>HY</th>
              <th>PT1</th>
              <th>PT2</th>
              <th>PT3</th>
              <th>PT4</th>
              <th>Annual</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{report[`HY ${subject}`] || "-"}</td>
                <td>{report[`PT1 ${subject}`] || "-"}</td>
                <td>{report[`PT2 ${subject}`] || "-"}</td>
                <td>{report[`PT3 ${subject}`] || "-"}</td>
                <td>{report[`PT4 ${subject}`] || "-"}</td>
                <td>{report[`ANNUAL ${subject}`] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Marks</h3>
        <p>HY: {totalMarks.HY}, PT1: {totalMarks.PT1}, PT2: {totalMarks.PT2}, PT3: {totalMarks.PT3}, PT4: {totalMarks.PT4}, Annual: {totalMarks.Annual}</p>

        <h3>Total Percentage</h3>
        <p>HY: {totalPercentage.HY}, PT1: {totalPercentage.PT1}, PT2: {totalPercentage.PT2}, PT3: {totalPercentage.PT3}, PT4: {totalPercentage.PT4}, Annual: {totalPercentage.Annual}</p>

        <h3>Rank: {studentInfo.rank}</h3>
        <h3>Result: {studentInfo.result}</h3>

        <h3>Co-Scholastic Details</h3>
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
      </div>

      <p>Remarks: ________________</p>
      <p>Class Teacher: __________ Exam Incharge: __________ Principal: __________</p>
      <p>Parent's Signature: __________</p>
    </div>
  );
};

export default ReportCard;
