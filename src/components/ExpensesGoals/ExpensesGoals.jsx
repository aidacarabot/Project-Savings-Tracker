import { useEffect, useState } from 'react'
import useFinanceStats from '../../hooks/useFinanceStats'; // Para obtener los datos financieros

//? Recibe "view" como prop para saber en qué vista se encuentra el usuario
const ExpensesGoals = ({ view }) => {
  const { savings, expenses } = useFinanceStats(); // Obtención de los datos financieros
  const categories = [
    'Home 🏠', 'Transportation 🚗', 'Food & Groceries 🍽️', 'Health & Wellness 🏥',
    'Leisure & Entertainment 🎭', 'Travel ✈️', 'Subscriptions 💳', 'Shopping 🛍️',
    'Education 📚', 'Gifts 🎁', 'Debt 🏦', 'Other ❓'
  ]; //Se define un array de categorias con sus respectivos nombres

  //* Estado inicial para los objetivos de cada categoria. Guarda el objetivo y el total gastado.
  const [categoryGoals, setCategoryGoals] = useState(
    categories.reduce((acc, category) => {
      acc[category] = { goal: 0, spent: 0 };
      return acc;
    }, {})
  );

  //* Cargar los objetivos guardados del localStorage dependiendo de la vista
  useEffect(() => {
    const storedCategoryGoals = JSON.parse(localStorage.getItem(`${view}CategoryGoals`));
    console.log(storedCategoryGoals);
    if (storedCategoryGoals) {
      setCategoryGoals(storedCategoryGoals);
    }
  }, [view]); // Cargar los objetivos específicos cuando se cambie la vista

  //* Calculamos el total gastado por cada categoría en el periodo seleccionado
  useEffect(() => {
    const totalSpentByCategory = categories.reduce((acc, category) => {
      const categoryExpenses = expenses.filter(expense => expense.category === category);

      // Calculamos el total gastado por categoría según la vista (Semana, Mes, Año)
      let totalSpent = 0;
      if (view === 'Week') {
        totalSpent = categoryExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      } else if (view === 'Month') {
        totalSpent = categoryExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      } else if (view === 'Year') {
        totalSpent = categoryExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      }

      // Asignamos el total gastado por categoría
      acc[category] = { ...acc[category], spent: totalSpent };
      return acc;
    }, {});

    setCategoryGoals(prevState => ({
      ...prevState,
      ...totalSpentByCategory
    }));
  }, [expenses, view]);

  //* Guardamos los objetivos de categoría en el localStorage dependiendo de la vista
  useEffect(() => {
    // Almacenar en localStorage con una clave única según la vista
    localStorage.setItem(`${view}CategoryGoals`, JSON.stringify(categoryGoals));
  }, [categoryGoals, view]); // Guardamos los nuevos valores cuando `categoryGoals` cambien

  //* Manejar el cambio de objetivo para una categoría específica
  const handleGoalChange = (category, value) => {
    setCategoryGoals(prevState => ({
      ...prevState,
      [category]: { ...prevState[category], goal: value }
    }));
  };

  //* Calculamos el objetivo total de ahorro, que es la suma de todos los objetivos de gasto
  const savingsGoal = Object.values(categoryGoals).reduce((acc, category) => acc + (category.goal || 0), 0);
  const savingsProgress = savingsGoal > 0 ? ((savings / savingsGoal) * 100).toFixed(2) : 0;

  return (
    <div className="expenses-goals">
      {categories.map(category => (
        <div key={category}>
          <div>
            <label>{`${category}`}</label>
            <input
              type="number" //Esto permite que el usuario sólo ingrese números
              value={categoryGoals[category].goal}
              onChange={(e) => handleGoalChange(category, parseFloat(e.target.value))} //"e.target.value" es el valor que el usuario ingresa. parseFloat convierte el string en un número decimal.
              placeholder={`Set your expense`}
            />
            <p>
              Total Spent vs. Goal: ${categoryGoals[category].spent} / ${categoryGoals[category].goal || 0}
              {categoryGoals[category].spent <= categoryGoals[category].goal ? ' ✅' : ' ❌'}
            </p>
          </div>
        </div>
      ))}

      <div>
        <h4>Total Savings Goal: ${savingsGoal}</h4>
        <p>Current Savings: ${savings} / ${savingsGoal}</p>
        <p>Savings Progress: {savingsProgress}%</p>
      </div>
    </div>
  );
}

export default ExpensesGoals;