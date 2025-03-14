import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../styles/ReportCard.css"; // Ensure styling

const ReportCard = () => {
  const location = useLocation();
  const report = location.state?.report;

  if (!report) {
    return <h2>No report found. Please go back and enter details.</h2>;
  }

  const downloadPDF = () => {
    const input = document.getElementById("report-card");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`ReportCard_${report["NAME OF THE STUDENT"]}.pdf`);
    });
  };

  return (
    <div id="report-card" className="report-card">
      <h1>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</h1>
      <h2>Progress Report Card 2024-25</h2>
      <p><strong>Name:</strong> {report["NAME OF THE STUDENT"]}</p>
      <p><strong>Class:</strong> {report["class"]} | <strong>Section:</strong> {report["Section"]} | <strong>Roll No:</strong> {report["Roll No."]}</p>

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
          <tr><td>English</td><td>{report["PT1 ENGLISH"]}</td><td>{report["PT2 ENGLISH"]}</td><td>{report["HY ENGLISH"]}</td><td>{report["PT3 ENGLISH"]}</td><td>{report["PT4 ENGLISH"]}</td><td>-</td></tr>
          <tr><td>Odia</td><td>{report["PT1 ODIA"]}</td><td>{report["PT2 ODIA"]}</td><td>{report["HY ODIA"]}</td><td>{report["PT3 ODIA"]}</td><td>{report["PT4 ODIA"]}</td><td>-</td></tr>
          <tr><td>Mathematics</td><td>{report["PT1 MATHEMATICS"]}</td><td>{report["PT2  MATHEMATICS"]}</td><td>{report["HY MATHEMATICS"]}</td><td>{report["PT3 MATHEMATICS"]}</td><td>{report["PT4 MATHEMATICS"]}</td><td>-</td></tr>
        </tbody>
      </table>

      <h3>Total Marks: {report["HY TOTAL MARK"]}</h3>
      <h3>Percentage: {report["HY %age"]}%</h3>
      <h3>Rank: {report["rank"]}</h3>

      <button onClick={downloadPDF} className="download-btn">Download PDF</button>
    </div>
  );
};

export default ReportCard;
