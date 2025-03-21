import React from "react";
import useFinanceStats from "../hooks/useFinanceStats";

const SavingsPercentage = () => {
  const { savings } = useFinanceStats();

  // Similar al cálculo anterior, pero solo para ahorros
  const previousMonthSavings = 1000; // Este dato debe obtenerse de alguna manera

  const savingsChange = calculatePercentageChange(savings, previousMonthSavings);

  return (
    <div>
      <h3>Savings Percentage Change</h3>
      <p>{savingsChange > 0 ? `+${savingsChange}%` : `${savingsChange}%`} from the previous month.</p>
    </div>
  );
};

export default SavingsPercentage;