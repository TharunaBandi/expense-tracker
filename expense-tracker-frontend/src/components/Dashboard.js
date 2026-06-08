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

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");

  const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  });

  useEffect(() => {
    fetch(`${API}/api/expenses?userId=${userId}`, {
      headers: getHeaders()
    })
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
      headers: getHeaders(),
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
    fetch(`${API}/api/expenses/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    })
      .then(() => {
        setExpenses(prev => prev.filter(e => e.id !== id));
        setFiltered(prev => prev.filter(e => e.id !== id));
      })
      .catch(err => console.error("Failed to delete expense", err));
  };

  const startEdit = (e) => {
    setEditingId(e.id);
    setEditTitle(e.title);
    setEditCategory(e.category);
    setEditAmount(e.amount);
    setEditDate(e.date);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id) => {
    const updated = {
      title: editTitle,
      category: editCategory,
      amount: Number(editAmount),
      date: editDate,
      userId
    };
    fetch(`${API}/api/expenses/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(saved => {
        setExpenses(prev => prev.map(e => e.id === id ? saved : e));
        setFiltered(prev => prev.map(e => e.id === id ? saved : e));
        setEditingId(null);
      })
      .catch(err => console.error("Failed to update expense", err));
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? All your expenses will be permanently deleted!")) {
      fetch(`${API}/api/auth/delete/${userId}`, {
        method: "DELETE",
        headers: getHeaders()
      })
        .then(() => {
          alert("Account deleted successfully!");
          logout();
        })
        .catch(err => console.error("Failed to delete account", err));
    }
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
      <div style={{ textAlign: "left", marginBottom: "4px", paddingLeft: "4px" }}>
        <span style={{ color: "#a78bfa", fontWeight: "bold", fontSize: "14px" }}>
          👤 Hi, {username}!
        </span>
      </div>

      <div className="header">
        <h1>Expense Tracker</h1>
        <div className="btn-group">
          <button
            className="logout-btn"
            style={{ backgroundColor: "#ef4444" }}
            onClick={deleteAccount}
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
              {editingId === e.id ? (
                <>
                  <td>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </td>
                  <td>
                    <input
                      value={editCategory}
                      onChange={e => setEditCategory(e.target.value)}
                      style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </td>
                  <td>
                    <input
                      value={editAmount}
                      onChange={e => setEditAmount(e.target.value)}
                      style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editDate}
                      onChange={e => setEditDate(e.target.value)}
                      style={{ width: "100%", padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </td>
                  <td style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                    <button className="add-btn" style={{ padding: "8px 12px" }} onClick={() => saveEdit(e.id)}>Save</button>
                    <button className="reset-btn" style={{ padding: "8px 12px" }} onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{e.title}</td>
                  <td>{e.category}</td>
                  <td style={{ color: "green", fontWeight: 650 }}>₹ {e.amount}</td>
                  <td>{e.date}</td>
                  <td style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                    <button
                      className="delete-btn"
                      style={{ backgroundColor: "#f59e0b" }}
                      onClick={() => startEdit(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteExpense(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;