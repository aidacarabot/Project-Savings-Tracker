import { format } from "date-fns"; //Se importa para trabajar con fechas.

//! Este archivo define cómo se deben modificar los datos (ingresos, gastos y ahorros) cuando ocurren ciertas acciones. Este archivo contiene la lógica para manejar el estado de las finanzas. Básicamente se asegura de que los datos se actualicen correctamente cuando se agregan nuevos gastos, ingresos o ahorros, con la fecha formateada de acuerdo con el dia, mes y año.

//El reducer recibe 2 parametros: state (estado inicial) y action (la accion que se va a ejecutar)
const financeReducer = (state, action) => {

  //Se utilizar switch para manejar diferentes tipos de acciones que se envían al reducer. Dependiendo del tipo de acción (action.type), se realiza una operación específica.
  switch (action.type) {

    //* Este caso maneja la acción de agregar un nuevo gasto al estado financiero.
    case "ADD_EXPENSE":
      const expenseDate = new Date(action.payload.date); //Obtenemos la fecha del gasto y la convertimos en un objeto "Date" para poder manipularla en las siguientes lineas:
      const expenseDay = format(expenseDate, "EEEE"); // Ejemplo: "Monday"
      const expenseMonth = format(expenseDate, "MMMM"); // Ejemplo: "January"
      const expenseYear = format(expenseDate, "yyyy"); // Ejemplo: "2023"

      //Creamos un objeto que contiene todos los datos del gasto, incluyendo el día, mes y año calculados anteriormente.
      const newExpense = {
        ...action.payload,
        day: expenseDay, // Día de la semana
        month: expenseMonth, // Mes
        year: expenseYear, // Año
      };

      const updatedExpenses = [...state.expenses, newExpense]; //Agregamos el nuevo gasto al array de state.expenses, esto genera un nuevo array con gastos anteriores y nuevos.
      const newStateWithExpense = { ...state, expenses: updatedExpenses }; //Creamos un nuevo objeto de estado con los gastos actualizados.
      console.log("Guardando en localStorage ADD_EXPENSE:", newStateWithExpense); //!Para ver lo que guardamos en localStorage. Aparecerá cuando agregues un EXPENSE.
      localStorage.setItem('financeData', JSON.stringify(newStateWithExpense)); //?  guardamos los datos en localStorage con el nombre de 'financeData'
      return newStateWithExpense; //Retornamos el nuevo estado con los gastos actualizados.

    //* Agregar un nuevo ingreso
    case "ADD_INCOME":
      //Obtenemos la fecha del ingreso y la formateamos para obtener el dia, mes y año.
      const incomeDate = new Date(action.payload.date);
      const incomeDay = format(incomeDate, "EEEE"); // Ejemplo: "Monday"
      const incomeMonth = format(incomeDate, "MMMM"); // Ejemplo: "January"
      const incomeYear = format(incomeDate, "yyyy"); // Ejemplo: "2023"

      //Creamos un objeto con la información del ingreso, añadiendo los valores del dia, mes y año.
      const newIncome = {
        ...action.payload,
        day: incomeDay, // Día de la semana
        month: incomeMonth, // Mes
        year: incomeYear, // Año
      };

      const updatedIncome = [...state.income, newIncome]; //Actualizamos los ingresos. Agregamos el nuevo ingreso al array state.income.
      const newStateWithIncome = { ...state, income: updatedIncome }; //Generamos un nuevo objeto de estado con los ingreso actualizados.
      console.log("Guardando en localStorage ADD_INCOME:", newStateWithIncome); //!Para ver lo que guardamos en localStorage. Aparecerá cuando agregues un INCOME.
      localStorage.setItem('financeData', JSON.stringify(newStateWithIncome)); //?Guardamos los datos en localStorage con el nombre de 'financeData'
      return newStateWithIncome; //Retornamos el nuevo estado con el ingreso agregado.

    //* Actualizar el valor del ahorro
    case "UPDATE_SAVINGS":
      const updatedSavings = { ...state, savings: action.payload }; //Creamos un nuevo objeto de estado con el valor de ahorro actualizado (action.payload)
      console.log("Guardando en localStorage UPDATE_SAVINGS:", updatedSavings); //!Para ver lo que guardamos en localStorage. Aparecerá cuando actualices el SAVINGS.
      localStorage.setItem('financeData', JSON.stringify(updatedSavings)); //?Guardamos los datos en localStorage con el nombre de 'financeData'
      return updatedSavings; //Devolvemos el nuevo estado con los ahorros actualizados.

    //* Si el tipo de acción no coincide con ninguno de los casos anteriores, devolvemos el estados actual sin modificarlo.
    default:
      return state;
  }
};

export default financeReducer; //Exportamos el reducer para poder utilizarlo en otros archivos.