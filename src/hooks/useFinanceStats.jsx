//! Un hook personalizado para calcular y devolver las estadísticas de finanzas como balance, ingresos, gastos, y ahorros. Usa FinanceContext para acceder al estado financiero y realizar cálculos o transformaciones sobre ellos. Es el paso final que permite a los componentes usar fácilmente las estadísticas financieras.

import { useContext, useMemo } from 'react'
import FinanceContext from '../context/FinanceContext'

const useFinanceStats = () => {
  const { state } = useContext(FinanceContext); // Obtenemos el estado del contexto. Proporciona datos financieros (income, expenses, savings).
  const { income, expenses, savings, categories } = state; // Extraemos estos del state para poder usarlos en los cálculos

  const safeSavings = Array.isArray(savings) ? savings : [];   // Asegúrate de que savings sea un array, si no es un array, asigna un array vacío. Para que funcione en "Overview".

  console.log("Categories:", categories);

  //* Cálculo del Balance
  const balance = useMemo(() => { //Se utiliza useMemo para calcular el balance. Esto evita que se recalcule en cada renderizado, solo se recalcula cuando cambian los ingresos o gastos.
    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0); //Va acumulando/sumando los valores de income que encuentra.
    const totalExpenses = expenses.reduce((acc, item) => acc + item.amount, 0); //Va acumulando/sumando los valores de expenses que encuentra.
    return totalIncome - totalExpenses; //El balance total será la resta de los ingresos menos los gastos.
  }, [income, expenses]); //Se recalcula cuando cambian los ingresos o gastos.

  //* Agrupar los gastos por categoría
  const groupedByCategory = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const category = expense.category;  // Obtenemos la categoría del gasto
      if (!acc[category]) acc[category] = [];  // Si no existe la categoría, la inicializamos
      acc[category].push(expense);  // Agregamos el gasto a la categoría correspondiente
      return acc;
    }, {});
  }, [expenses]);

  //* Agrupar los gastos por día
  const groupedByDay = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const day = expense.day;
      if (!acc[day]) acc[day] = [];
      acc[day].push(expense);
      return acc;
    }, {});
  }, [expenses]);

  //* Agrupar los gastos por mes
  const groupedByMonth = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      const month = expense.month;
      if (!acc[month]) acc[month] = [];
      acc[month].push(expense);
      return acc;
    }, {});
  }, [expenses]);

  //* Agrupar los ingresos por día de la semana
  const groupedIncomeByDay = useMemo(() => {
    return income.reduce((acc, incomeItem) => {
      const day = incomeItem.day;
      if (!acc[day]) acc[day] = [];
      acc[day].push(incomeItem);
      return acc;
    }, {});
  }, [income]);

  //* Agrupar los ingresos por mes
  const groupedIncomeByMonth = useMemo(() => {
    return income.reduce((acc, incomeItem) => {
      const month = incomeItem.month;
      if (!acc[month]) acc[month] = [];
      acc[month].push(incomeItem);
      return acc;
    }, {});
  }, [income]);

  //* Devolver las estadísticas calculadas y de ahi la podemos usar en otros archivos.
  return { 
    balance, 
    income, 
    expenses, 
    savings:safeSavings,
    categories,
    groupedByCategory,
    groupedByDay,
    groupedByMonth,
    groupedIncomeByDay,
    groupedIncomeByMonth 
  };
};

export default useFinanceStats;