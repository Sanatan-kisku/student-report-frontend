import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
import "jspdf-autotable";
import "../styles/ReportCard.css"; // Ensure correct styling

const ReportCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report || null;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(700);

  // 🎉 Show confetti if Rank = 1
  // useEffect(() => {
  //   if (parseInt(studentInfo.rank) === 1) {  // Ensure rank is treated as a number
  //     setShowConfetti(true);
  //     setTimeout(() => setShowConfetti(false), 5000); // Hide after 5s
  //   }
  // }, [studentInfo.rank]);

  const studentInfo = {
    name: report["NAME OF THE STUDENT"],
    rollNumber: report["Roll No."],
    section: report["Section"],
    class: report["Class"],
    rank: parseInt(report["Rank"]),
    result: report["Result"],
  };

  const teacherSignatures = {
    // "VIA": "signatures/AparnaMalla.png",
    // "VIIIA": "signatures/BiswajitBadaraita.png",
    // "IXB": "signatures/TMohanRao.png",
    // "XIA": "signatures/HimansuSekharSabar.png",
  };

  const studentClass = studentInfo.class + studentInfo.section; // Example: "6A"
  // console.log(studentClass)
  const teacherSignature = teacherSignatures[studentClass] || "";
  // console.log(teacherSignature)

  // const studentClass = report["Class"] + report["Section"]; // Example: "6A"
  // const teacherInfo = teacherSignatures[studentClass] || { name: "Unknown", signature: "" };

  // useEffect(() => {
  //   if (studentInfo.rank === 1) {
  //     let count = 300; // Start with 300 pieces
  //     const interval = setInterval(() => {
  //       count -= 20; // Reduce pieces gradually
  //       setConfettiPieces(Math.max(count, 0)); // Prevent negative values
  //       if (count <= 0) clearInterval(interval); // Stop when count reaches 0
  //     }, 200); // Reduce every 200ms
  //   }
  // }, [studentInfo.rank]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (studentInfo.rank === 1) {
      setShowConfetti(true);
      setConfettiPieces(700); // Start with more pieces

      let pieces = 700;
      const interval = setInterval(() => {
        pieces -= 15; // Reduce gradually for smoother fade-out
        setConfettiPieces(Math.max(0, pieces));

        if (pieces <= 0) {
          clearInterval(interval);
          setTimeout(() => setShowConfetti(false), 1500); // Wait 1.5 sec before stopping
        }
      }, 200); // Smooth decrease every 200ms

      return () => clearInterval(interval);
    }
  }, [studentInfo.rank]);

  if (!report) {
    return <h2>No Report Found</h2>;
  }

  const subjects = Object.keys(report)
    .filter((key) => (key.includes("HY ") || key.includes("PT") || key.includes("ANNUAL")) && !key.includes("TOTAL MARK") && !key.includes("%age"))
    .reduce((acc, key) => {
      const subjectName = key.replace(/HY |PT[1-4] |ANNUAL /g, "").trim();
      if (!acc.includes(subjectName)) acc.push(subjectName);
      return acc;
    }, []);

  const coScholastic = [
    { id: 1, activity: "HEALTH AND PHYSICAL EDUCATION", grade: report["PE"] || "-" },
    { id: 2, activity: "ART", grade: report["AM"] || "-" },
    { id: 3, activity: "WORK EDUCATION", grade: report["PE"] || "-" },
    { id: 4, activity: "MUSIC", grade: report["AM"] || "-" },
  ];

  const handleDownloadPDF = () => {
    const reportCardElement = document.querySelector(".report-card");

    // Dynamically adjust scale based on screen size
    const scaleFactor = window.innerWidth <= 768 ? 7 : 3;
    const pdfMargin = window.innerWidth <= 768 ? 5 : 5; // Less margin for mobile

    html2canvas(reportCardElement, {
      scale: scaleFactor, // Adjusted scale for better clarity
      useCORS: true, // Prevents cross-origin issues
      dpi: 500, // Ensure high DPI for sharper text
      letterRendering: true,
      scrollX: 0, // Prevents horizontal scroll issues
      scrollY: 0, // Prevents vertical scroll issues
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1); // High-quality image
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm (A4 width)
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm (A4 height)

      const imgWidth = pdfWidth - pdfMargin * 2; // Apply dynamic margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      if (imgHeight > pdfHeight - pdfMargin * 2) {
        pdf.addImage(imgData, "JPEG", pdfMargin, pdfMargin, imgWidth, pdfHeight - pdfMargin * 2); // Fit into page
      } else {
        pdf.addImage(imgData, "JPEG", pdfMargin, pdfMargin, imgWidth, imgHeight); // Normal case
      }

      pdf.save(`${studentInfo.class}${studentInfo.section}-${studentInfo.rollNumber}-${studentInfo.name} Report Card.pdf`);
    });
  };

  const handlePrint = () => {
    const printContents = document.getElementById("report-card").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Refresh to restore original page
  };
  // const handleDownloadPDF = () => {
  //   const reportCardElement = document.querySelector(".report-card");

  //   html2canvas(reportCardElement, {
  //     scale: 1.5, // Reduce scale to lower image size but maintain clarity
  //     useCORS: true, // Fix CORS issues if images are from external URLs
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/jpeg", 0.7); // Convert PNG → JPEG (smaller size)
  //     const pdf = new jsPDF("p", "mm", "a4");

  //     const imgWidth = 210; // A4 width in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

  //     pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  //     pdf.save(`${studentInfo.name}_Class${studentInfo.class}.pdf`);
  //   });
  // };

  // const getRankStyle = (rank) => {
  //   if (rank === 1) return { fontWeight: "bold", emoji: "🏆" }; // Gold & Trophy
  //   if (rank === 2) return { fontWeight: "bold", emoji: "🥈" }; // Silver & Medal
  //   if (rank === 3) return { fontWeight: "bold", emoji: "🥉" }; // Copper & Medal
  //   return { color: "black", fontWeight: "bold", }; // Default for other ranks
  // };

  // const rankStyle = getRankStyle(studentInfo.rank);

  // const drawStar = (ctx, x, y, radius, points, innerRadius) => {
  //   ctx.beginPath();
  //   for (let i = 0; i < points * 2; i++) {
  //     const angle = (i * Math.PI) / points;
  //     const r = i % 2 === 0 ? radius : innerRadius;
  //     ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
  //   }
  //   ctx.closePath();
  //   ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`; // Random bright colors
  //   ctx.fill();
  // };

  // const subjectOrders = {
  //   6: ["English", "Odia", "Mathematics", "Science", "Social Science", "I C T", "Hindi", "Sanskrit"],
  //   7: ["ENGLISH", "ODIA", "MATHEMATICS", "SCIENCE", "SOCIAL SCIENCE", "I C T", "HINDI", "SANSKRIT"],
  //   8: ["English", "Odia", "Mathematics", "Science", "Social Science", "I C T", "Hindi", "Sanskrit"],
  //   9: ["English", "Odia", "Mathematics", "Science", "Social Science", "I C T", "Hindi", "Sanskrit"],
  //   11: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "I C T", "PE"]
  // };

  // const sortSubjects = (subjects, studentClass) => {
  //   const order = subjectOrders[studentClass] || [];
  //   return subjects.sort((a, b) => {
  //     return order.indexOf(a.name) - order.indexOf(b.name);
  //   });
  // };

  // const ReportCard = ({ subjects, studentClass }) => {
  //   const sortedSubjects = sortSubjects([...subjects], studentClass);



  return (
    <div className="report-container">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={confettiPieces}
          gravity={0.2}
          wind={0.02}
          tweenDuration={3000}
        // recycle={false}
        // drawShape={(ctx) => drawStar(ctx, 0, 0, 6, 5, 3)}
        />
      )}
      {/* {studentInfo.rank === 1 && (
        <div className="rank-flash">
          🎉 Congratulations! You achieved Rank 1 🎉
        </div>
      )} */}
      {/* <img src="/OavLogo.jpeg" alt="Watermark" className="watermark" /> */}
      <div className="report-card" id="reportCard">
        <img src="/OavLogo.jpeg" alt="Watermark" className="watermark-pdf" />
        <div className="header-section">
          <img src="/OdishaLogo.svg.png" alt="Left" className="header-image box left" />
          <div className="school-info center">
            <h2><strong>ODISHA ADARSHA VIDYALAYA, SURADA, GANJAM</strong></h2>
            <h3><b>At/Po-Surada, Block-Surada, Dist-Ganjam, Pin-761108 <br /> &#9993; sorada@oav.edu.in</b></h3>
            <p>(OAVS, BBSR UNDER DEPT. OF SCHOOL & MASS EDUCATION GOVT.OF ODISHA)</p>
          </div>
          <img src="/OavLogo.jpeg" alt="Right" className="header-image box right" />
        </div>
        <h3>Affiliated to CBSE, New Delhi, Affiliation No. - 1520050, School No. - 17193, U-DISE CODE - 21192228501 </h3>
        <h2>PROGRESS REPORT CARD 2024-25</h2>
        {/* <div>
          <p><strong>Name:</strong> {studentInfo.name}</p>
          <p><strong>Class:</strong> {studentInfo.class} <strong>Section:</strong> {studentInfo.section} <strong>Roll No:</strong> {studentInfo.rollNumber}</p>
        </div> */}
        <table>
          <tr>
            <td colspan="4"><b>NAME OF THE STUDENT</b></td>
            <td colspan="4">{studentInfo.name}</td>
          </tr>
          <tr>
            <td><b>CLASS</b></td>
            <td>{studentInfo.class}</td>
            <td><b>SEC</b></td>
            <td>{studentInfo.section}</td>
            <td><b>ROLL NO</b></td>
            <td colSpan={isMobile ? 3 : 3}>{studentInfo.rollNumber}</td>
          </tr>
        </table>

        <h3 className="table-heading">SCHOLASTIC DETAILS</h3>
        <table>
          <thead>
            <tr>
              <th rowSpan="2">SL NO</th>
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
                {/* {sortedSubjects.map((subject, index) => (
              <tr key={index}> */}
                <td>{index + 1}</td>
                <td className="subject">{subject}</td>
                <td>{report[`PT1 ${subject}`] || "-"}</td>
                <td>{report[`PT2 ${subject}`] || "-"}</td>
                <td>{report[`HY ${subject}`] || "-"}</td>
                <td>{report[`PT3 ${subject}`] || "-"}</td>
                <td>{report[`PT4 ${subject}`] || "-"}</td>
                <td>{report[`ANNUAL ${subject}`] || "-"}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2"><strong>TOTAL MARK</strong></td>
              <td>{report["PT1 TOTAL MARK"] || "-"}</td>
              <td>{report["PT2 TOTAL MARK"] || "-"}</td>
              <td>{report["HY TOTAL MARK"] || "-"}</td>
              <td>{report["PT3 TOTAL MARK"] || "-"}</td>
              <td>{report["PT4 TOTAL MARK"] || "-"}</td>
              <td>{report["ANNUAL TOTAL MARK"] || "-"}</td>
            </tr>
            <tr>
              <td colSpan="2"><strong>TOTAL PERCENTAGE</strong></td>
              <td>{report["PT1 %age"] ? parseFloat(report["PT1 %age"]).toFixed(2) : "-"}</td>
              <td>{report["PT2 %age"] ? parseFloat(report["PT2 %age"]).toFixed(2) : "-"}</td>
              <td>{report["HY %age"] ? parseFloat(report["HY %age"]).toFixed(2) : "-"}</td>
              <td>{report["PT3 %age"] ? parseFloat(report["PT3 %age"]).toFixed(2) : "-"}</td>
              <td>{report["PT4 %age"] ? parseFloat(report["PT4 %age"]).toFixed(2) : "-"}</td>
              <td>{report["ANNUAL %age"] ? parseFloat(report["ANNUAL %age"]).toFixed(2) : "-"}</td>
            </tr>
            <tr>
              <td colSpan="4"><strong>RANK</strong></td>
              <td colSpan="4">
                <h3>
                  {studentInfo.rank}
                </h3>
              </td>
            </tr>
            <tr>
              <td colSpan="4"><strong>RESULT</strong></td>
              <td colSpan="4">{studentInfo.result}</td>
            </tr>
          </tbody>
        </table>

        {/* <h3>Rank: {studentInfo.rank}</h3>
        <h3>Result: {studentInfo.result}</h3> */}

        <h3 className="table-heading">CO-SCHOLASTIC DETAILS</h3>
        <table>
          <thead>
            <tr>
              <th>SL NO</th>
              <th>ACTIVITY</th>
              <th>GRADE</th>
            </tr>
          </thead>
          <tbody>
            {coScholastic.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td className="activity">{activity.activity}</td>
                <td>{activity.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="remark-table">
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}><strong>REMARK:</strong></td>
            </tr>
          </tbody>
        </table>

        <div className="signature-section">
          <table className="signature">
            <tr>
              <td>
                {teacherSignature && (
                  <div className="teacher-signature">
                    <img
                      src={teacherSignature || "/signatures/BlankSignature.png"}
                      alt="Teacher's Signature"
                      className="signature-img"
                      onError={(e) => e.target.src = "/signatures/BlankSignature.png"}
                    />
                  </div>
                )}
                <p>CLASS TEACHER</p>
              </td>
              <td>
                <img src="/ExamInchargeSignature.jpg" alt="Exam Incharge Signature" className="signature-img" />
                <p>EXAM INCHARGE</p>
              </td>
              <td>
                <img src="/PrincipalSignature.jpg" alt="Principal Signature" className="signature-img" />
                <p>PRINCIPAL</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/signatures/BlankSignature.jpg" className="signature-img" />
                <p>PARENT'S SIGNATURE</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="download-warning">
        <p><strong>📢 It is recommended to download the PDF on a computer for the best experience. Avoid using Desktop Mode on a mobile browser.</strong></p>
      </div>
      <div className="download-btn floating-buttons" style={{ textAlign: "center" }}>
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onclick={handlePrint}>Print Report Card</button>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    </div>
  );
  // };
};

export default ReportCard;
