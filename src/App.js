import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetReport from "./components/GetReport";
import ReportCard from "./components/ReportCard";
import AdminLogin from "./components/AdminLogin";
import UploadFiles from "./components/UploadFiles";
import "./styles/footer.css";

const Footer = () => (
  <footer className="footer">
    <p>
      Website Designed and Developed by <strong>Mr. Sanatan Kisku</strong>, PGT Computer Science, OAV Surada
    </p>
  </footer>
);

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load token from localStorage if available
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GetReport />} />
          <Route path="/report-card" element={<ReportCard />} />
          <Route path="/admin-login" element={<AdminLogin setToken={setToken} />} />
          <Route path="/admin-upload" element={token ? <UploadFiles /> : <AdminLogin setToken={setToken} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
