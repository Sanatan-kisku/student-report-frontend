import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetReport from "./components/GetReport";
import ReportCard from "./components/ReportCard";
import AdminLogin from "./components/AdminLogin";  // Ensure this import is correct
import UploadFiles from "./components/UploadFiles";  // Ensure file upload is restricted

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetReport />} />
        <Route path="/report-card" element={<ReportCard />} />
        <Route path="/admin-login" element={<AdminLogin setToken={setToken} />} />
        <Route path="/admin-upload" element={token ? <UploadFiles /> : <AdminLogin setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
