import { useContext, useMemo, useState } from 'react'
import ExpensesForm from '../Transactions/ExpensesForm/ExpensesForm'
import FinanceContext from '../../context/FinanceContext';

const TransactionsHistory = ({ transactions, type, categories = []}) => {
  const { dispatch } = useContext(FinanceContext); 

  //* Estado de los filtros
  const [filters, setFilters] = useState({
    date: '', //? Hay que cambiar esto
    category: '',
    minPrice: '', //? Hay que cambiar esto
    maxPrice: '' //? Hay que cambiar esto
  })

  const [optionsVisible, setOptionsVisible] = useState(null) //Para mostrar y ocultar "Edit" y "Delete"
  const [showEditForm, setShowEditForm] = useState(false) //Estado para controlar la visibilidad del Formulario
  const [transactionToEdit, setTransactionToEdit] = useState(null) //Estado para almacenar la transaction seleccionada para editar
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false) //Estado para mostrar el modal de confirmación
  const [transactionToDelete, setTransactionToDelete] = useState(null) //Estado para almacenar la transaction a eliminar

  //* Para manejar el cambio de los filtros
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  //* Para filtrar las transactions
  const filteredTransactions = useMemo(() => {
    //Filtra las transacciones según los criterios especificados en los filtros:
    return transactions.filter((tx) => {
      //Verifica si la transaction coincide con la fecha del filro, si no, será "true"
      const matchesDate = filters.date ? tx.date === filters.date : true
      //Verifica si la trasaction coincide con la categoria, solo si es "Expense", si no, será "true":
      const matchesCategory =
        type === 'expenses' && filters.category
          ? tx.category === filters.category
          : true
      //Verifica si la trasaction coincide con el precio mínimo, si no, será "true":
      const matchesMinPrice = filters.minPrice
        ? tx.amount >= Number(filters.minPrice)
        : true
      //Verifica si la trasaction coincide con el precio máximo, si no, será "true":
      const matchesMaxPrice = filters.maxPrice
        ? tx.amount <= Number(filters.maxPrice)
        : true
      //Retorna true si todas las condiciones se cumplen
      return (
        matchesDate && matchesCategory && matchesMinPrice && matchesMaxPrice
      )
    })
  }, [transactions, filters, type]) //useMemo se asegura de que la función de filtrado solo se vuelva a calcular si cambian las transacciones, los filtros o el tipo

  //* Función para mostrar y ocultar las opciones "Edit" y "Delete"
  const toggleOptions = (index) => {
    setOptionsVisible((prev) => (prev === index ? null : index))
  }

  //? Manejo de eliminar una trasaction. Hay que mejorarlo para que en vez de un window alert, sea un div con un mensaje y un botón de confirmación o cancelación. Y cuando se elimine de verdad se elimine al momento, que no haya que recargar la página para verlo.
  //* Manejo de eliminar una transacción
  const handleDelete = () => {
    if (transactionToDelete) {
      // Eliminar la transacción en el estado global utilizando dispatch
      dispatch({ type: 'DELETE_EXPENSE', payload: transactionToDelete })

      // Limpiar el estado de confirmación
      setShowDeleteConfirm(false)
      setTransactionToDelete(null) // Limpiar la transacción seleccionada para eliminar
    }
  }

  //* Manejo de la cancelación de la eliminación
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
    setTransactionToDelete(null) // Limpiar la transacción seleccionada para eliminar
  }

  //* Manejo de la edición de una transacción
  const handleEdit = (transaction) => {
    localStorage.setItem('editTransaction', JSON.stringify(transaction)) // Guardar la transacción seleccionada en localStorage
    window.dispatchEvent(new Event('openEditForm')) // Disparar un evento para abrir el formulario de edición (si se utiliza)
  }

  return (
    <div className='transaction-history'>
      {/* Renderiza el título depende del tipo de transacción */}
      <h2>
        {' '}
        {type === 'expenses'
          ? 'Expenses'
          : type === 'income'
          ? 'Income'
          : 'All Transactions'}
      </h2>
      <div className='filters'>
        <input
          type='date'
          name='date'
          value={filters.date}
          onChange={handleChange}
        />
        {type === 'expenses' && (
          <select
            name='category'
            value={filters.category}
            onChange={handleChange}
          >
            <option value=''>All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
        {type !== 'all' && (
          <>
            <input
              type='number'
              name='minPrice'
              placeholder='Min Price'
              value={filters.minPrice}
              onChange={handleChange}
            />
            <input
              type='number'
              name='maxPrice'
              placeholder='Max Price'
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </>
        )}
      </div>

    {/* Modal de confirmación de eliminación */}
    {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <p>Are you sure you want to delete this transaction?</p>
          <button onClick={handleDelete}>Confirm</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}

      {/* Condicionalmente renderizar el formulario de edición */}
      {showEditForm && (
        <ExpensesForm
          onClose={() => {
            setShowEditForm(false);  // Cerrar el formulario de edición
            setTransactionToEdit(null);  // Limpiar la transacción seleccionada
          }}
        />
      )}

      {/* Renderiza la lista de transacciones */}
      <ul className='transaction-list'>
        {filteredTransactions.map((tx, i) => (
          <li key={i} className='transaction-item'>
            <span>{tx.date}</span>
            <span>{tx.name || 'No Description'}</span>
            <span>{tx.amount} €</span>
            {tx.category && <span>{tx.category}</span>}

            {/* Mostrar los 3 puntitos solo si no es la vista "all" */}
            {type !== 'all' && (
              <div className='options-menu'>
                <button onClick={() => toggleOptions(i)}>⋯</button>
                {optionsVisible === i && (
                  <div className='options-dropdown'>
                    <button onClick={() => {
                      setTransactionToDelete(tx); // Almacenar la transacción a eliminar
                      setShowDeleteConfirm(true); // Mostrar el modal de confirmación
                    }}>
                      Delete
                    </button>
                    <button onClick={() => handleEdit(tx)}>Edit</button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsHistory