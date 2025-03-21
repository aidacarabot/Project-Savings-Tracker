import { useContext, useState, useRef } from 'react'
import FinanceContext from '../../../context/FinanceContext' //Para obtener el dispatch y agregar el gasto
import { format } from 'date-fns'

const IncomeForm = ({onClose}) => {
  const { dispatch } = useContext(FinanceContext); // Obtenemos el dispatch del contexto

  //* Referencias a los inputs del formulario
  const inputName = useRef();
  const inputDate = useRef();
  const inputPrice = useRef();

  const [error, setError] = useState({}); // Para mostrar el mensaje de error si no se llenan todos los campos

  const handleSubmit = (e) => {
    e.preventDefault();
    //* Validación de campos
    if (!inputName.current.value || !inputDate.current.value || !inputPrice.current.value) {
      setError({ message: 'All fields are required' });
      return;
    }

    const incomeDate = new Date(inputDate.current.value);
    const incomeDay = format(incomeDate, 'EEEE');
    const incomeMonth = format(incomeDate, 'MMMM');
    const incomeYear = format(incomeDate, 'yyyy');

    const newIncome = {
      name: inputName.current.value,
      date: inputDate.current.value,
      price: inputPrice.current.value,
      day: incomeDay,
      month: incomeMonth,
      year: incomeYear,
    };

    //* Dispatch para agregar el ingreso
    dispatch({ type: 'ADD_INCOME', payload: newIncome });
    onClose(); // Cerrar el formulario al enviar los datos
  };

  return (
    <div className="income-form">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h3>Add New Income</h3>
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
          <label>Price ($)</label>
          <input type="number" ref={inputPrice} />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default IncomeForm