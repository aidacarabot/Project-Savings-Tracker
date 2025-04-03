import { useContext, useState } from 'react'
import FinanceContext from '../../../context/FinanceContext' //Para obtener el dispatch y agregar el gasto
import { format } from 'date-fns'

const IncomeForm = ({onClose}) => {
  const { dispatch } = useContext(FinanceContext); // Obtenemos el dispatch del contexto

  //* Referencias a los inputs del formulario
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState({}); // Para mostrar el mensaje de error si no se llenan todos los campos
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalTransaction, setOriginalTransaction] = useState(null);

  useEffect(() => {
    const editData = localStorage.getItem('editTransaction');
    if (editData) {
      const transaction = JSON.parse(editData);
      if (transaction.type === 'expense') {
        setName(transaction.name || '');
        setDate(transaction.date || '');
        setPrice(transaction.amount || '');
        setCategory(transaction.category || '');
        setIsEditMode(true);
        setOriginalTransaction(transaction);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    //* Validación de campos
    if (!name || !date || !price) {
      setError({ message: 'All fields are required' })
      return
    }

    const incomeDate = new Date(date)
    const incomeDay = format(incomeDate, 'EEEE')
    const incomeMonth = format(incomeDate, 'MMMM')
    const incomeYear = format(incomeDate, 'yyyy')

    const newIncome = {
      name,
      date,
      amount: Number(price),
      day: incomeDay,
      month: incomeMonth,
      year: incomeYear
    }

    if (isEditMode && originalTransaction) {
      dispatch({ type: 'DELETE_INCOME', payload: originalTransaction })
      localStorage.removeItem('editTransaction')
    }

    //* Dispatch para agregar el ingreso
    dispatch({ type: 'ADD_INCOME', payload: newIncome })
    onClose() // Cerrar el formulario al enviar los datos
  };

  return (
      <div className="income-form">
      <button className="close-button" onClick={onClose}>X</button>
      <h3>{isEditMode ? 'Edit Income' : 'Add New Income'}</h3>
      {error.message && <p style={{ color: 'red' }}>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit">{isEditMode ? 'Update Income' : 'Add Income'}</button>
      </form>
      </div>
    )
}

export default IncomeForm