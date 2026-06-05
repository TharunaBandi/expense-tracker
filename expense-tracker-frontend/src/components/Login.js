import React, { useState } from "react";
import "../App.css";

const API = "http://localhost:8080";

function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) return res.text().then(t => { throw new Error(t); });
        return res.json();
      })
      .then(data => {
        onLogin(data.id, data.username);
      })
      .catch(err => alert("Login failed: " + err.message));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Expense Tracker Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <div style={{ position: "relative", marginBottom: "15px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", paddingRight: "40px", marginBottom: "0" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "16px",
              userSelect: "none"
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button onClick={handleLogin}>Login</button>
        <p
          style={{ textAlign: "center", marginTop: "10px", cursor: "pointer", color: "#a78bfa" }}
          onClick={onSwitchToRegister}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;