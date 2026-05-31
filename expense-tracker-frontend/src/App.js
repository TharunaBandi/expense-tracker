import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [screen, setScreen] = useState("login");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  const handleLogin = (id, name) => {
    setUserId(id);
    setUsername(name);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setUserId(null);
    setUsername("");
    setScreen("login");
  };

  return (
    <>
      {screen === "login" && (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setScreen("register")} />
      )}
      {screen === "register" && (
        <Register onSwitchToLogin={() => setScreen("login")} />
      )}
      {screen === "dashboard" && (
        <Dashboard logout={handleLogout} userId={userId} username={username} />
      )}
    </>
  );
}

export default App;