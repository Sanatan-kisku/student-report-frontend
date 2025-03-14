import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import navigation

const AdminLogin = ({ setToken }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // Initialize navigation

  const login = async () => {
    try {
      const response = await axios.post("https://student-report-backend.onrender.com/admin/login", form);
      setToken(response.data.token);
      localStorage.setItem("adminToken", response.data.token); // Store token
      alert("Login Successful!");
      navigate("/admin-upload"); // Redirect to upload page
    } catch {
      alert("Invalid credentials!");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default AdminLogin;
