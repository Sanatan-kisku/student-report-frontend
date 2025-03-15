import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import "../styles/ReportCard.css"; // Ensure correct styling

const ReportCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    .filter((key) => (key.includes("HY ") || key.includes("PT") || key.includes("ANNUAL")) && !key.includes("TOTAL MARK") && !key.includes("%age"))
    .reduce((acc, key) => {
      const subjectName = key.replace(/HY |PT[1-4] |ANNUAL /g, "").trim();
      if (!acc.includes(subjectName)) acc.push(subjectName);
      return acc;
    }, []);

  const coScholastic = [
    { id: 1, activity: "Health and Physical Education", grade: report["pe"] || "-" },
    { id: 2, activity: "Art", grade: report["am"] || "-" },
    { id: 3, activity: "Work Education", grade: report["we"] || "-" },
    { id: 4, activity: "Music", grade: report["music"] || "-" },
  ];

  const handleDownloadPDF = () => {
    const reportCardElement = document.querySelector(".report-card");
    html2canvas(reportCardElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`${studentInfo.name}_Class${studentInfo.class}.pdf`);
    });
  };

  return (
    <div className="report-container">
      <div className="report-card" id="reportCard">
        <div className="header-section">
          <img src="/OdishaLogo.svg.png" alt="Left" className="header-image box left" />
          <div className="school-info center">
            <h2>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</h2>
            <h3>At/Po-Surada, Block-Surada, Dist-Ganjam, Pin-761108  sorada@oav.edu.in</h3>
            <h4>(OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)</h4>
          </div>
          <img src="/OavLogo.jpeg" alt="Right" className="header-image box right" />
        </div>
        <h3>Affiliated to CBSE, New Delhi, Affiliation No. - 1520050, School No. - 17193, U-DISE CODE - 21192228501 </h3>
        <h2>PROGRESS REPORT CARD 2024-25</h2>
        <p style="text-align: center; font-weight: bold; font-size: 1.2em;"><strong>Name:</strong> {studentInfo.name}</p>
        <p style="text-align: center; font-weight: bold; font-size: 1.2em;"><strong>Class:</strong> {studentInfo.class} <strong>Section:</strong> {studentInfo.section} <strong>Roll No:</strong> {studentInfo.rollNumber}</p>

        <h3 className="table-heading">SCHOLASTIC DETAILS</h3>
        <table>
          <thead>
            <tr>
              <th rowSpan="2">SL No</th>
              <th rowSpan="2">SUBJECT</th>
              <th colSpan="6">MARKS SECURED</th>
            </tr>
            <tr>
              <th>PT1</th>
              <th>PT2</th>
              <th>HY</th>
              <th>PT3</th>
              <th>PT4</th>
              <th>ANNUAL</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject}>
                <td>{index + 1}</td>
                <td>{subject}</td>
                <td>{report[`PT1 ${subject}`] || "-"}</td>
                <td>{report[`PT2 ${subject}`] || "-"}</td>
                <td>{report[`HY ${subject}`] || "-"}</td>
                <td>{report[`PT3 ${subject}`] || "-"}</td>
                <td>{report[`PT4 ${subject}`] || "-"}</td>
                <td>{report[`ANNUAL ${subject}`] || "-"}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2"><strong>Total Marks</strong></td>
              <td>{report["PT1 TOTAL MARK"] || "-"}</td>
              <td>{report["PT2 TOTAL MARK"] || "-"}</td>
              <td>{report["HY TOTAL MARK"] || "-"}</td>
              <td>{report["PT3 TOTAL MARK"] || "-"}</td>
              <td>{report["PT4 TOTAL MARK"] || "-"}</td>
              <td>{report["ANNUAL TOTAL MARK"] || "-"}</td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Total Percentage</strong></td>
              <td>{report["PT1 %age"] || "-"}</td>
              <td>{report["PT2 %age"] || "-"}</td>
              <td>{report["HY %age"] || "-"}</td>
              <td>{report["PT3 %age"] || "-"}</td>
              <td>{report["PT4 %age"] || "-"}</td>
              <td>{report["ANNUAL %age"] || "-"}</td>
            </tr>
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
      <div className="buttons" style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    </div>
  );
};

export default ReportCard;
