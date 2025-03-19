//! Un hook personalizado para calcular y devolver las estadísticas de finanzas como balance, ingresos, gastos, y ahorros.

import { useContext, useMemo } from 'react'
import FinanceContext from '../context/FinanceContext'

const useFinanceStats = () => {
  const { state } = useContext(FinanceContext); // Obtenemos el estado financiero desde el contexto
  const { income, expenses, savings } = state; // Extraemos los ingresos, gastos y ahorros

  // Asegúrate de que savings sea un arreglo
  const savingsArray = Array.isArray(savings) ? savings : []; // Si savings no es un arreglo, asigna uno vacío

  // Calculamos el balance solo cuando cambian los ingresos o los gastos
  const balance = useMemo(() => {
    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
    const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
    return totalIncome - totalExpenses;
  }, [income, expenses]);

  // Agrupar los gastos por día de la semana (ejemplo: lunes, martes, etc.)
  const groupedByDay = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const day = expense.day;
      if (!acc[day]) acc[day] = [];
      acc[day].push(expense);
      return acc;
    }, {});
  }, [expenses]);

  // Agrupar los gastos por mes (ejemplo: enero, febrero, etc.)
  const groupedByMonth = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const month = expense.month;
      if (!acc[month]) acc[month] = [];
      acc[month].push(expense);
      return acc;
    }, {});
  }, [expenses]);

  // Agrupar los ingresos por día de la semana
  const groupedIncomeByDay = useMemo(() => {
    return income.reduce((acc, incomeItem) => {
      const day = incomeItem.day;
      if (!acc[day]) acc[day] = [];
      acc[day].push(incomeItem);
      return acc;
    }, {});
  }, [income]);

  // Agrupar los ingresos por mes
  const groupedIncomeByMonth = useMemo(() => {
    return income.reduce((acc, incomeItem) => {
      const month = incomeItem.month;
      if (!acc[month]) acc[month] = [];
      acc[month].push(incomeItem);
      return acc;
    }, {});
  }, [income]);

  // Devolver las estadísticas calculadas
  return { 
    balance, 
    income, 
    expenses, 
    savings: savingsArray,
    groupedByDay,
    groupedByMonth,
    groupedIncomeByDay,
    groupedIncomeByMonth 
  };
};

export default useFinanceStats;