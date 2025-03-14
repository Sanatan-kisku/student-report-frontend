import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ setToken }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const login = async () => {
    try {
      const response = await axios.post("https://student-report-backend.onrender.com/admin/login", form);
      setToken(response.data.token);
      alert("Login Successful!");
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
