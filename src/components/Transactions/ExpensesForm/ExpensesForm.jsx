import { useContext, useState, useEffect } from 'react'
import FinanceContext from '../../../context/FinanceContext' //Para obtener el dispatch y agregar el gasto
import { format } from 'date-fns'
import useFinanceStats from '../../../hooks/useFinanceStats';

const ExpensesForm = ({onClose}) => {
  const { dispatch } = useContext(FinanceContext) //Obtener el dispatch del contexto para actualizar el estado
  const { categories } = useFinanceStats();  // Accedemos a categorías y tipos desde el hook


  const [name, setName] = useState(''); // Estado para almacenar el nombre del gasto
  const [date, setDate] = useState(''); // Estado para almacenar la fecha del gasto
  const [price, setPrice] = useState(''); // Estado para almacenar el precio del gasto
  const [category, setCategory] = useState('');  // Estado para almacenar la categoría del gasto
  const [error, setError] = useState({}); // Estado para manejar errores de validación
  const [isEditMode, setIsEditMode] = useState(false); // Estado para verificar si estamos en modo edición o creando un nuevo gasto
  const [originalTransaction, setOriginalTransaction] = useState(null); // Estado para almacenar la transacción original si estamos editando

  //* Este useEffect se ejecuta solo una vez cuando el componente se monta, y su objetivo es verificar si hay datos guardados en localStorage (específicamente en editTransaction).
  useEffect(() => {
    const editData = localStorage.getItem('editTransaction');
    if (editData) { // Si encuentra una transacción guardada en localStorage, precarga los datos del formulario con la información de la transacción y activa el modo edición (setIsEditMode(true)).
      const transaction = JSON.parse(editData);
      if (transaction) {
        setName(transaction.name);  // Precargar el nombre
        setDate(transaction.date);  // Precargar la fecha
        setPrice(transaction.amount);  // Precargar el precio
        setCategory(transaction.category);  // Precargar la categoría
        setIsEditMode(true);  // Activar el modo edición
        setOriginalTransaction(transaction);  // Guardar la transacción original
      }
    }
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  //* Manejar el evento "Submit" de envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault() //Para no recargar la página al enviar el formulario

    //* Valida que todos los campos estén completos, si no se muestra un mensaje de error
    if (!name || !date || !price || !category) {
      setError({ message: 'All fields are required' })
      return
    }

    // Convertimos la fecha a un formato más manejable
    const expenseDate = new Date(date)
    const expenseDay = format(expenseDate, 'EEEE')
    const expenseMonth = format(expenseDate, 'MMMM')
    const expenseYear = format(expenseDate, 'yyyy')

    //*Creamos un objeto con los datos del nuevo gasto
    const newExpense = {
      name,
      date,
      amount: Number(price), //Convertimos el precio a número
      category,
      type: 'expense', //Establecemos que es un gasto
      day: expenseDay,
      month: expenseMonth,
      year: expenseYear
    }

    //? Si estamos en modo edición, eliminamos la transacción original antes de agregar la nueva
    if (isEditMode && originalTransaction) {
      dispatch({ type: 'DELETE_EXPENSE', payload: originalTransaction }) //? Asegurate de tener esto bien definido en FinanceReducer
      localStorage.removeItem('editTransaction')  // Limpiamos el `localStorage` después de editar
    }

    //* Actualiza el estado global utilizando dispatch y cierra el formulario con onClose().
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense }) //? Asegurate de tener esto bien definido en FinanceReducer
    onClose() //Cerramos el formulario al terminar
  };

  return (
    <div className="expenses-form">
      <button className="close-button" onClick={onClose}>X</button>

      <h3>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</h3>

      {error.message && <p style={{ color: 'red' }}>{error.message}</p>}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Price ($)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <button type="submit">{isEditMode ? 'Update Expense' : 'Add Expense'}</button>
      </form>
    </div>
  );
};

export default ExpensesForm;