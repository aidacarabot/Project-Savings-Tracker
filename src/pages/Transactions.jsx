import { useState } from 'react'
import useToday from '../hooks/useToday'
import PieChartExpenses from '../components/Charts/PieChartExpenses/PieChartExpenses'
import ExpensesForm from '../components/Transactions/ExpensesForm/ExpensesForm'
import IncomeForm from '../components/Transactions/IncomeForm/IncomeForm'
import TransactionsHistory from '../components/TransactionsHistory/TransactionsHistory'
import useFinanceStats from '../hooks/useFinanceStats'


const Transactions = () => {
  const today = useToday()

  // Estado para manejar qué vista mostrar
  const [view, setView] = useState('All') // Empezamos con la vista 'All'
  const [isFormOpen, setIsFormOpen] = useState(false) // Estado para controlar si el formulario está abierto o cerrado

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const { expenses, categories, income } = useFinanceStats();
  const all = [...income, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <h3>Today is {today}</h3>

      <div className='buttons-transactions'>
        <button onClick={() => setView('Expenses')}>Expenses</button>
        <button onClick={() => setView('Income')}>Income</button>
        <button onClick={() => setView('All')}>All</button>
      </div>

      <h2>{`You are in the ${view} view`}</h2>

      {view === 'All' && (
        <>
          <TransactionsHistory transactions={all} type='all' />
        </>
      )}

      {view === 'Income' && (
        <>
          <button onClick={handleOpenForm}>Add Income</button>
          {/* Mostrar el formulario si isFormOpen es true */}
          {isFormOpen && <IncomeForm onClose={handleCloseForm} />}

          <TransactionsHistory transactions={income} type='income' />
        </>
      )}

      {view === 'Expenses' && (
        <>
          <PieChartExpenses />

          <button onClick={handleOpenForm}>Add Expense</button>
          {/* Mostrar el formulario si isFormOpen es true */}
          {isFormOpen && <ExpensesForm onClose={handleCloseForm} />}

          <TransactionsHistory
            transactions={expenses}
            type='expenses'
            categories={categories}
          />
        </>
      )}
    </>
  )
}

export default Transactions
