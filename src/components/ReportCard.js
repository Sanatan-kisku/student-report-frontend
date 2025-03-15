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
  };

  // Extract subjects dynamically
  const subjects = Object.keys(report)
    .filter((key) => key.includes("HY ") || key.includes("PT"))
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM", 20, 10);
    doc.setFontSize(12);
    doc.text(`Student: ${studentInfo.name}`, 20, 20);
    doc.text(`Class: ${studentInfo.class}  Section: ${studentInfo.section}  Roll No: ${studentInfo.rollNumber}`, 20, 30);

    // Table data
    const tableData = subjects.map((subject) => [
      subject,
      report[`PT1 ${subject}`] || "-",
      report[`PT2 ${subject}`] || "-",
      report[`HY ${subject}`] || "-",
      report[`PT3 ${subject}`] || "-",
      report[`PT4 ${subject}`] || "-",
      report[`ANNUAL ${subject}`] || "-",
    ]);

    doc.autoTable({
      startY: 40,
      head: [["Subject", "PT1", "PT2", "HY", "PT3", "PT4", "Annual"]],
      body: tableData,
    });

    doc.text("Total Marks:", 20, doc.autoTable.previous.finalY + 10);
    doc.text(`PT1: ${totalMarks.PT1}, PT2: ${totalMarks.PT2}, HY: ${totalMarks.HY}, PT3: ${totalMarks.PT3}, PT4: ${totalMarks.PT4}, Annual: ${totalMarks.Annual}`, 20, doc.autoTable.previous.finalY + 20);

    doc.text("Total Percentage:", 20, doc.autoTable.previous.finalY + 30);
    doc.text(` PT1: ${totalPercentage.PT1}, PT2: ${totalPercentage.PT2}, HY: ${totalPercentage.HY}, PT3: ${totalPercentage.PT3}, PT4: ${totalPercentage.PT4}, Annual: ${totalPercentage.Annual}`, 20, doc.autoTable.previous.finalY + 40);

    doc.save("Student_Report_Card.pdf");
  };

  return (
    <div className="report-container">

      <div className="report-card">
        <div>
          <div>
            <img src="../../public/OdishaLogo.svg.png" alt="" />
            <div>
              <h1>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</h1>
              <h2>At/Po-Surada, Block-Surada, Dist-Ganjam, Pin-761108      sorada@oav.edu.in</h2>
              <h2> (OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)</h2>
            </div>
            <img src="../../public/OavLogo.jpeg" alt="" />
          </div>
        </div>
        <div>
          <h2> (OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)
            Affiliated to CBSE, New Delhi, Affiliation No. - 1520050, School No. - 17193, U-DISE CODE - 21192228501
          </h2>
        </div>
        <div>
          <h1>PROGRESS REPORT CARD 2024-25</h1>
          <p><strong>Name:</strong> {studentInfo.name}</p>
          <p><strong>Class:</strong> {studentInfo.class} <strong>Section:</strong> {studentInfo.section} <strong>Roll No:</strong> {studentInfo.rollNumber}</p>
        </div>
        <div>
          <h1>SCHOLASTIC DETAILS</h1>
        </div>

        <table>
          <thead>
            <tr>
              <th>SL NO</th>
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
      </div>

      <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default ReportCard;
