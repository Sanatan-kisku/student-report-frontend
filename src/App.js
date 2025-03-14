import React from "react";
import UploadFiles from "./components/UploadFiles";
import GetReport from "./components/GetReport";

function App() {
  return (
    <div>
      <h1>Student Report Card System</h1>
      <UploadFiles />
      <hr />
      <GetReport />
    </div>
  );
}

export default App;
