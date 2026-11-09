import React from "react";

function ExpenseList({ expenses }) {
  return (
    <ul>
      {expenses.map((exp, i) => (
        <li key={i}>
          {exp.title} - {exp.amount} paid by {exp.payer}
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
