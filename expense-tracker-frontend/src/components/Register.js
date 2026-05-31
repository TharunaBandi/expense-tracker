import React, { useState } from "react";
import "../App.css";

const API = "http://localhost:8080";

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) return res.text().then(t => { throw new Error(t); });
        return res.json();
      })
      .then(() => {
        alert("Registered successfully! Please login.");
        onSwitchToLogin();
      })
      .catch(err => alert("Registration failed: " + err.message));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p style={{textAlign:"center", marginTop:"10px", cursor:"pointer", color:"#a78bfa"}}
           onClick={onSwitchToLogin}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;