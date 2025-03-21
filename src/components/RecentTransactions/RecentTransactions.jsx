import React from "react";
import useFinanceStats from "../hooks/useFinanceStats";

const RecentTransactions = () => {
  const { income, expenses } = useFinanceStats();

  const recentIncome = income.slice(0, 5);  // Muestra las 5 transacciones más recientes
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div>
      <h3>Recent Transactions</h3>
      <h4>Income</h4>
      <ul>
        {recentIncome.map((transaction, index) => (
          <li key={index}>
            {transaction.date}: ${transaction.amount}
          </li>
        ))}
      </ul>

      <h4>Expenses</h4>
      <ul>
        {recentExpenses.map((transaction, index) => (
          <li key={index}>
            {transaction.date}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;