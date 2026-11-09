import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState("");
  const [date, setDate] = useState("");

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  const addExpense = (e) => {
    e.preventDefault();
    const members = splitAmong.split(",").map(m => m.trim());
    const share = amount / members.length;

    let balances = {};
    members.forEach(m => {
      balances[m] = (balances[m] || 0) - share;
    });

    balances[paidBy] = (balances[paidBy] || 0) + Number(amount);

    const newExpense = {
      description,
      amount,
      paidBy,
      members,
      balances,
      date
    };

    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
    setPaidBy("");
    setSplitAmong("");
    setDate("");
  };

  // Filter logic
  const filteredExpenses = expenses.filter(exp =>
    exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.paidBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>TrustKey by Ankit</h1>
        <p>Smart Expense Sharing Made Simple</p>
      </header>

      <form onSubmit={addExpense} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Paid By"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        />
        <input
          type="text"
          placeholder="Split Among (comma separated)"
          value={splitAmong}
          onChange={(e) => setSplitAmong(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by trip or payer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="expense-list">
        {filteredExpenses.map((exp, i) => (
          <div key={i} className="expense-card">
            <h3>{exp.description}</h3>
            <p><strong>Date:</strong> {exp.date}</p>
            <p><strong>Amount:</strong> ₹{exp.amount}</p>
            <p><strong>Paid by:</strong> {exp.paidBy}</p>
            <p><strong>Split among:</strong> {exp.members.join(", ")}</p>
            <div className="balances">
              <h4>Balances:</h4>
              <ul>
                {Object.entries(exp.balances).map(([member, balance]) => (
                  <li key={member}>
                    <strong>{member}:</strong> ₹{balance.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;