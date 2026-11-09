const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let expenses = [];

app.post("/api/expenses", (req, res) => {
  const expense = req.body;
  expenses.push(expense);
  res.json({ message: "Expense saved!", expense });
});

app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

app.listen(5000, () => console.log("Server running on port 5000"));
