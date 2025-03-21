import { useContext, useState, useRef } from 'react'
import FinanceContext from '../../../context/FinanceContext' //Para obtener el dispatch y agregar el gasto
import { format } from 'date-fns'

const ExpensesForm = ({onClose}) => {
  const { dispatch } = useContext(FinanceContext) //Obtener el dispatch del contexto

  //*Referencias a los inputs del formulario
  const inputName = useRef()
  const inputDate = useRef()
  const inputPrice = useRef()
  const inputCategory = useRef()
  const inputType = useRef()

  const [error, setError] = useState({}) //Para mostrar el mensaje de error si no se llenan todos los campos

  const categories = ['Home 🏠', 'Transportation 🚗', 'Food & Groceries 🍽️', 'Health & Wellness 🏥', 'Leisure & Entertainment 🎭', 'Travel ✈️', 'Subscriptions 💳', 'Shopping 🛍️', 'Education 📚', 'Gifts 🎁', 'Debt 🏦', 'Other ❓'];
  const types = ['Fixed', 'Variable'];

  const handleSubmit = (e) => {
    e.preventDefault(); //Evitar que se recargue la página
  
    //* Validación de campos
    if (!inputName.current.value || !inputDate.current.value || !inputPrice.current.value || !inputCategory.current.value || !inputType.current.value) {
      setError({ message: 'All fields are required'});
      return;
    }

    const expenseDate = new Date(inputDate.current.value);
    const expenseDay = format(expenseDate, 'EEEE');
    const expenseMonth = format(expenseDate, 'MMMM');
    const expenseYear = format(expenseDate, 'yyyy');

    const newExpense = {
      name: inputName.current.value,
      date: inputDate.current.value,
      price: inputPrice.current.value,
      category: inputCategory.current.value,
      type: inputType.current.value,
      day: expenseDay,
      month: expenseMonth,
      year: expenseYear,
    };

    //* Dispatch para agregar el gasto
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    onClose(); //Cerrar el formulario al enviar los datos
  };

  return (
    <div className='expenses-form'>
      <button className='close-button' onClick={onClose}>
        X
      </button>
      <h3>Add New Expense</h3>
      {error.message && <p style={{ color: 'red' }}>{error.message}</p>}
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>
          <input type="text" ref={inputName} />
        </div>

        <div>
          <label>Date</label>
          <input type="date" ref={inputDate} />
        </div>

        <div>
          <label>Category</label>
          <select ref={inputCategory}>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>
          <select ref={inputType}>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Price ($)</label>
          <input type="number" ref={inputPrice} />
        </div>

          <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default ExpensesForm