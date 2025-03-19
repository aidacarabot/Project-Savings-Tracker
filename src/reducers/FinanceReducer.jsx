import { format } from "date-fns";

//! Reducer para manejar las acciones y modificaciones del estado de las finanzas.

const financeReducer = (state, action) => {
  switch (action.type) {

    // Agregar un nuevo gasto
    case "ADD_EXPENSE":
      // Obtener la fecha proporcionada y calcular el día de la semana, mes y año
      const expenseDate = new Date(action.payload.date);
      const expenseDay = format(expenseDate, "EEEE"); // Ejemplo: "Monday"
      const expenseMonth = format(expenseDate, "MMMM"); // Ejemplo: "January"
      const expenseYear = format(expenseDate, "yyyy"); // Ejemplo: "2023"

      const newExpense = {
        ...action.payload,
        day: expenseDay, // Día de la semana
        month: expenseMonth, // Mes
        year: expenseYear, // Año
      };

      const updatedExpenses = [...state.expenses, newExpense];
      const newStateWithExpense = { ...state, expenses: updatedExpenses };
      localStorage.setItem('financeData', JSON.stringify(newStateWithExpense));
      return newStateWithExpense;

    // Agregar un nuevo ingreso
    case "ADD_INCOME":
      // Obtener la fecha proporcionada y calcular el día de la semana, mes y año
      const incomeDate = new Date(action.payload.date);
      const incomeDay = format(incomeDate, "EEEE"); // Ejemplo: "Monday"
      const incomeMonth = format(incomeDate, "MMMM"); // Ejemplo: "January"
      const incomeYear = format(incomeDate, "yyyy"); // Ejemplo: "2023"

      const newIncome = {
        ...action.payload,
        day: incomeDay, // Día de la semana
        month: incomeMonth, // Mes
        year: incomeYear, // Año
      };

      const updatedIncome = [...state.income, newIncome];
      const newStateWithIncome = { ...state, income: updatedIncome };
      localStorage.setItem('financeData', JSON.stringify(newStateWithIncome));
      return newStateWithIncome;

    // Actualizar el ahorro
    case "UPDATE_SAVINGS":
      const updatedSavings = { ...state, savings: action.payload };
      localStorage.setItem('financeData', JSON.stringify(updatedSavings));
      return updatedSavings;

    default:
      return state;
  }
};

export default financeReducer;