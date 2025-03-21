import React from "react";
import useFinanceStats from "../hooks/useFinanceStats";

const TodaysStats = () => {
  const { balance, income, expenses, savings } = useFinanceStats();

  // Calcula el % de cambio con respecto al mes anterior
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const previousMonthIncome = 5000; // Este dato debe obtenerse de alguna manera (debe implementarse en tu lógica)
  const previousMonthExpenses = 3000;
  const previousMonthSavings = 1000;

  const incomeChange = calculatePercentageChange(income, previousMonthIncome);
  const expenseChange = calculatePercentageChange(expenses, previousMonthExpenses);
  const savingsChange = calculatePercentageChange(savings, previousMonthSavings);

  return (
    <div>
      <h3>Today's Stats</h3>
      <p>Balance: ${balance}</p>
      <p>Income this month: ${income} ({incomeChange > 0 ? `+${incomeChange}%` : `${incomeChange}%`})</p>
      <p>Expenses this month: ${expenses} ({expenseChange > 0 ? `+${expenseChange}%` : `${expenseChange}%`})</p>
      <p>Savings this month: ${savings} ({savingsChange > 0 ? `+${savingsChange}%` : `${savingsChange}%`})</p>
    </div>
  );
};

export default TodaysStats;