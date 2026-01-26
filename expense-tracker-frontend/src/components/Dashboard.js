import React, { useState, useEffect } from "react";
import "../App.css";

function Dashboard({ logout }) {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [total, setTotal] = useState(null);

  // LOAD from localStorage when page opens
useEffect(() => {
  const savedExpenses = localStorage.getItem("expenses");
  if (savedExpenses) {
    setExpenses(JSON.parse(savedExpenses));
  }
}, []);

// SAVE to localStorage whenever expenses change
useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

  useEffect(() => {
    setFiltered(expenses);
  }, [expenses]);

  const addExpense = () => {
    if (!title || !category || !amount || !date) {
      alert("Fill all fields");
      return;
    }

    const newExp = { title, category, amount, date };
    setExpenses([...expenses, newExp]);

    setTitle("");
    setCategory("");
    setAmount("");
    setDate("");
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

  const deleteExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    setFiltered(updated);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Expense Tracker</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
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
          {filtered.map((e, i) => (
            <tr key={i}>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td style={{ color: "green",fontWeight: 650 }}>₹ {e.amount}</td>
              <td>{e.date}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteExpense(i)}>
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
