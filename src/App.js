import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetReport from "./GetReport";
import ReportCard from "./ReportCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetReport />} />
        <Route path="/report-card" element={<ReportCard />} />
      </Routes>
    </Router>
  );
}

export default App;