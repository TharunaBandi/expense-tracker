import React, { useState, useEffect } from "react";
import "../App.css";

const API = "http://localhost:8080";

function Dashboard({ logout, userId, username }) {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [total, setTotal] = useState(null);

  // LOAD from backend — filtered by userId
  useEffect(() => {
    fetch(`${API}/api/expenses?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setFiltered(data);
      })
      .catch(err => console.error("Failed to load expenses", err));
  }, [userId]);

  useEffect(() => {
    setFiltered(expenses);
  }, [expenses]);

  const addExpense = () => {
    if (!title || !category || !amount || !date) {
      alert("Fill all fields");
      return;
    }

    const newExp = { title, category, amount: Number(amount), date, userId };

    fetch(`${API}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExp),
    })
      .then(res => res.json())
      .then(saved => {
        setExpenses(prev => [...prev, saved]);
        setTitle("");
        setCategory("");
        setAmount("");
        setDate("");
      })
      .catch(err => console.error("Failed to add expense", err));
  };

  const deleteExpense = (id) => {
    fetch(`${API}/api/expenses/${id}`, { method: "DELETE" })
      .then(() => {
        setExpenses(prev => prev.filter(e => e.id !== id));
        setFiltered(prev => prev.filter(e => e.id !== id));
      })
      .catch(err => console.error("Failed to delete expense", err));
  };

  const applyFilter = () => {
    if (!month || !year) {
      alert("Select month & year");
      return;
    }

    const result = expenses.filter((e) => {
      const d = new Date(e.date);
      return (
        d.getMonth() + 1 === parseInt(month) &&
        d.getFullYear() === parseInt(year)
      );
    });

    setFiltered(result);
    setTotal(result.reduce((s, e) => s + Number(e.amount), 0));
  };

  const resetFilter = () => {
    setFiltered(expenses);
    setMonth("");
    setYear("");
    setTotal(null);
  };

  return (
    <div className="container">
        <div style={{
          textAlign: "left",
          marginBottom: "4px",
          paddingLeft: "4px"
        }}>
          <span style={{
            color: "#a78bfa",
            fontWeight: "bold",
            fontSize: "14px",
          }}>👤 Hi, {username}!</span>
        </div>

        <div className="header">
          <h1>Expense Tracker</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              color: "#a78bfa",
              fontWeight: "bold",
              fontSize: "14px"
            }}>👤 Hi, {username}!</span>
            <button
              className="logout-btn"
              style={{ backgroundColor: "#ef4444" }}
              onClick={() => {
                if (window.confirm("Are you sure you want to delete your account? All your expenses will be permanently deleted!")) {
                  fetch(`${API}/api/auth/delete/${userId}`, { method: "DELETE" })
                    .then(() => {
                      alert("Account deleted successfully!");
                      logout();
                    })
                    .catch(err => console.error("Failed to delete account", err));
                }
              }}
            >
              Delete Account
            </button>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>



      <div className="form-row">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button className="add-btn" onClick={addExpense}>Add</button>
      </div>

      <div className="filter-row">
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
        <button className="filter-btn" onClick={applyFilter}>Filter</button>
        <button className="reset-btn" onClick={resetFilter}>Reset</button>
      </div>

      {total !== null && <div className="total">Total spent: ₹ {total}</div>}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td style={{ color: "green", fontWeight: 650 }}>₹ {e.amount}</td>
              <td>{e.date}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteExpense(e.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;